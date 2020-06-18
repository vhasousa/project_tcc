import Mail from '../../lib/Mail';

class ConfirmationMail {
  get key() {
    return 'ConfirmationMail';
  }

  async handle({ data }) {
    const { url, name, email } = data;

    console.log('a fila executou');

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
}

export default new ConfirmationMail();
