import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User';

import authConfig from '../../config/auth';
import registerConfig from '../../config/register';

import Mail from '../../lib/Mail';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ message: 'Validations fail' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    /**
     * Verify the email being passed to see if user exists
     */

    if (!user) {
      return res.status(401).json({ message: 'User does not exists' });
    }

    /**
     * Check if the password does match
     */

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Password does not match' });
    }

    // if (!user.confirmed) {
    //   return res.redirect('http://localhost:3000/login/confirmation');
    // }

    const { id, name, student, confirmed } = user;

    /**
     * returning data from user and you token
     */

    return res.json({
      user: {
        id,
        name,
        email,
        student,
        confirmed,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async update(req, res) {
    try {
      const { id } = jwt.verify(req.params.token, registerConfig.secret);

      await User.update({ confirmed: true }, { where: { id } });
    } catch (err) {
      return res.json({ message: 'error' });
    }

    return res.redirect('http://localhost:3000/login');
  }

  async resend(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User does not exists' });
    }

    const { id, name } = user;

    jwt.sign(
      { id },
      registerConfig.secret,
      {
        expiresIn: registerConfig.expiresIn,
      },
      (err, mailToken) => {
        const url = `http://localhost:3333/sessions/confirmation/${mailToken}`;

        Mail.sendMail({
          to: `${name} <${email}>`,
          subject: 'Conta criada com sucesso',
          template: 'confirmation',
          context: {
            user: name,
            url,
          },
        });
      }
    );

    return res.send({ ok: true });
  }
}

export default new SessionController();
