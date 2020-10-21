import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';

import authConfig from '../../config/auth';
import registerConfig from '../../config/register';
import resetConfig from '../../config/resetPassword';

import Queue from '../../lib/Queue';
import ConfirmationMailResend from '../jobs/ConfirmationMail';
import RecoverPasswordMail from '../jobs/RecoverPasswordMail';

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

  /**
   * Update the cofirmed attributes to true when the user confirm your account
   * in the the send to the email
   */
  async update(req, res) {
    try {
      const { id } = jwt.verify(req.params.token, registerConfig.secret);

      await User.update({ confirmed: true }, { where: { id } });
    } catch (err) {
      return res.json({ message: 'error' });
    }

    return res.redirect('http://localhost:3000/login');
  }

  /**
   * In case of the user not receive the email, here is the option to resend
   */
  async resend(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User does not exists' });
    }

    const { id, name } = user;

    const mailToken = jwt.sign({ id }, registerConfig.secret, {
      expiresIn: registerConfig.expiresIn,
    });
    const url = `http://localhost:3333/sessions/confirmation/${mailToken}`;

    await Queue.add(ConfirmationMailResend.key, {
      url,
      name,
      email,
    });

    return res.send({ ok: true });
  }

  /**
   * Send e-mail with the token to recover the password
   */
  async passwordRecovery(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User does not exists' });
    }

    const { id, name } = user;

    const token = jwt.sign({ id }, resetConfig.secret, {
      expiresIn: resetConfig.expiresIn,
    });

    const url = `http://localhost:3333/sessions/reset/${token}`;

    await Queue.add(RecoverPasswordMail.key, {
      url,
      name,
      email,
    });

    /**
     * update the reset_token to the token created now
     */
    await User.update({ reset_token: token }, { where: { id } });

    return res.status(200).json({ ok: true });
  }

  /**
   * On click, the link will verify the params, and see if the token been
   * passed is valid
   */
  async verifyToken(req, res) {
    try {
      const { token } = req.params;

      const { id } = jwt.verify(req.params.token, resetConfig.secret);

      const user = await User.findOne({ where: { id } });

      /**
       * If the token in the parameter is different from the token in the database
       * so the token is already expires
       */

      if (user.reset_token !== token) {
        return res.status(401).message('Token is invalid');
      }

      return res.redirect(`http://localhost:3000/reset-password/${token}`);
    } catch (err) {
      return res.redirect('http://localhost:3000');
    }
  }
}

export default new SessionController();
