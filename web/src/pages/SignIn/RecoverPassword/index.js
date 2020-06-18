import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { recoverPassword } from '~/store/modules/user/actions';

import { Container } from './styles';

function RecoverPassword() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email }) {
    dispatch(recoverPassword(email));
  }

  return (
    <Container>
      <div>
        <section>
          <h1>RECUPERAÇÃO DE SENHA</h1>
          <p>Informe o e-mail para receber o token de autenticação</p>
        </section>

        <Form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            placeholder="E-mail para recuperação"
          />
          <button type="submit">
            {loading ? 'Carregando...' : 'Enviar código'}
          </button>
        </Form>
      </div>
    </Container>
  );
}

export default RecoverPassword;
