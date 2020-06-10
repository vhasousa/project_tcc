import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
// import QuestionDone from '../schemas/QuestionDone';
import registerConfig from '../../config/register';

import Mail from '../../lib/Mail';

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

    // await QuestionDone.create({ user_id: id });

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

  async index(req, res) {
    const user = await User.findAll({
      attributes: ['name'],
      include: [
        {
          association: 'schools',
          attributes: ['name'],
        },
        { association: 'grades', attributes: ['number', 'level'] },
      ],
    });

    return res.json(user);
  }
}

export default new UserController();
