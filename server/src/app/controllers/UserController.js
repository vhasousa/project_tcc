import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

import User from '../models/User';
import Wallet from '../models/Wallet';
import Investment from '../models/Investment';

import registerConfig from '../../config/register';
import resetConfig from '../../config/resetPassword';

import Queue from '../../lib/Queue';

import ConfirmationMail from '../jobs/ConfirmationMail';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(5),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ message: 'Validation error' });
    }

    const { email } = req.body;

    const userExists = await User.findOne({ where: { email } });

    /**
     * Checking if the user exists
     */
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const { id, name, confirmed } = await User.create(req.body);

    const mailToken = jwt.sign({ id }, registerConfig.secret, {
      expiresIn: registerConfig.expiresIn,
    });
    const url = `http://localhost:3333/sessions/confirmation/${mailToken}`;

    await Queue.add(ConfirmationMail.key, {
      url,
      name,
      email,
    });

    /*
    Create the wallet of the user
    */
    await Wallet.create({ user_id: id });
    await Investment.create({ user_id: id });

    return res.json({ name, email, confirmed });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string(),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => {
          return oldPassword ? field.required() : field;
        }),
      confirmPassword: Yup.string().when('password', (password, field) => {
        return password ? field.required().oneOf([Yup.ref('password')]) : field;
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ message: 'Validations fail' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findOne({ where: { id: req.userId } });

    if (user.email !== email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(401).json({ message: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ message: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }

  async show(req, res) {
    const user = await User.findOne({ where: { id: req.userId } });

    const { grade_id } = user;

    return res.json(grade_id);
  }

  async resetPassword(req, res) {
    try {
      const schema = Yup.object().shape({
        token: Yup.string(),
        password: Yup.string().required().min(6),
        confirmPassword: Yup.string().when('password', (password, field) => {
          return password
            ? field.required().oneOf([Yup.ref('password')])
            : field;
        }),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(401).json({ message: 'Validation error' });
      }

      const { password, token } = req.body;

      const { id } = jwt.verify(token, resetConfig.secret);

      const newPassword = await bcrypt.hash(password, 8);

      await User.update({ password_hash: newPassword }, { where: { id } });

      return res.json({ ok: true });
    } catch (err) {
      return res.json({ message: 'Error to update the user' });
    }
  }
}

export default new UserController();
