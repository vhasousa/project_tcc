import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowLeft } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { signInConfirmation } from '~/store/modules/auth/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string('Digite um e-mail válido').required(
    'O e-mail é obrigatório para recuperação de senha'
  ),
});

function Confirmation() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const onSubmit = ({ email }) => {
    dispatch(signInConfirmation(email));
  };

  return (
    <Container>
      <div>
        <section>
          <h1>E-mail ainda não confirmado</h1>
          <p>Verifique a sua caixa de entrada</p>
          <Link to="/login">
            <FiArrowLeft size={16} color="#555273" />
            Fazer login
          </Link>
        </section>

        <form onSubmit={handleSubmit(onSubmit)}>
          <small>
            Caso não tenha recebido o seu código, informe seu e-mail abaixo para
            enviar novamente
          </small>
          <input
            name="email"
            type="email"
            placeholder="E-mail para confirmação"
            ref={register}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <button type="submit">
            {loading ? 'Carregando...' : 'Reenviar código'}
          </button>
        </form>
      </div>
    </Container>
  );
}

export default Confirmation;
