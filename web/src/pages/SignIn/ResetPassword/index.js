import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { resetPassword } from '~/store/modules/user/actions';

import { Container } from './styles';

function ResetPassword({ match }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const { token } = match.params;

  console.tron.log(token);

  function handleSubmit({ password, confirmPassword, recoverToken = token }) {
    dispatch(resetPassword(password, confirmPassword, recoverToken));
  }

  return (
    <Container>
      <div>
        <section>
          <h1>DIGITE SUA NOVA SENHA</h1>
        </section>

        <Form onSubmit={handleSubmit}>
          <Input name="password" type="password" placeholder="Sua nova senha" />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirme sua nova senha"
          />
          <button type="submit">
            {loading ? 'Carregando...' : 'Atualizar senha'}
          </button>
        </Form>
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
