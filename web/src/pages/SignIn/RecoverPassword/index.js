import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { recoverPassword } from '~/store/modules/user/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string('Digite um e-mail válido').required(
    'O e-mail é obrigatório para recuperação de senha'
  ),
});

function RecoverPassword() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const onSubmit = ({ email }) => {
    dispatch(recoverPassword(email));
  };

  return (
    <Container>
      <div>
        <section>
          <h1>RECUPERAÇÃO DE SENHA</h1>
          <p>Informe o e-mail para receber o token de recuperação</p>

          <Link to="/login">
            <FiArrowLeft size={16} color="#555273" />
            Fazer login
          </Link>
        </section>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="email"
            type="email"
            placeholder="E-mail para recuperação"
            ref={register}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <button type="submit">
            {loading ? 'Carregando...' : 'Enviar código'}
          </button>
        </form>
      </div>
    </Container>
  );
}

export default RecoverPassword;
