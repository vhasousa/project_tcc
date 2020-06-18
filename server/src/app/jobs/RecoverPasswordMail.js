import Mail from '../../lib/Mail';

class RecoverPasswordMail {
  get key() {
    return 'RecoverPasswordMail';
  }

  async handle({ data }) {
    const { url, name, email } = data;

    Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Recuperação de senha',
      template: 'recovery',
      context: {
        user: name,
        url,
      },
    });
  }
}

export default new RecoverPasswordMail();
