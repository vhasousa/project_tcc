import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { resetPassword } from '~/store/modules/user/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  password: Yup.string()
    .required('A senha é obrigatória')
    .min(6, 'No mínimo 6 caracteres.'),
  confirmPassword: Yup.string().when('password', (password, field) => {
    return password
      ? field
        .required('Confirmação de senha obrigatória')
        .oneOf([Yup.ref('password')], 'Confirmação de senha não é igual')
      : field;
  }),
});

function ResetPassword({ match }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const { token } = match.params;

  const onSubmit = ({ password, confirmPassword, recoverToken = token }) => {
    dispatch(resetPassword(password, confirmPassword, recoverToken));
  };

  return (
    <Container>
      <div>
        <section>
          <h1>DIGITE SUA NOVA SENHA</h1>
        </section>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="password"
            type="password"
            placeholder="Sua nova senha"
            ref={register}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirme sua nova senha"
            ref={register}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
          <button type="submit">
            {loading ? 'Carregando...' : 'Atualizar senha'}
          </button>
        </form>
      </div>
    </Container>
  );
}

ResetPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};

export default ResetPassword;
