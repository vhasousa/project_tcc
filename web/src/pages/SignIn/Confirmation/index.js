import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signInConfirmation } from '~/store/modules/auth/actions';

import { Container } from './styles';

function Confirmation() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email }) {
    dispatch(signInConfirmation(email));
  }

  return (
    <Container>
      <div>
        <section>
          <h1>E-mail ainda não confirmado</h1>
          <p>Verifique a sua caixa de entrada</p>
        </section>

        <Form onSubmit={handleSubmit}>
          <small>
            Caso não tenha recebido o seu código, informe seu e-mail abaixo para
            enviar novamente
          </small>
          <Input
            name="email"
            type="email"
            placeholder="E-mail para confirmação"
          />
          <button type="submit">
            {loading ? 'Carregando...' : 'Reenviar código'}
          </button>
        </Form>
      </div>
    </Container>
  );
}

export default Confirmation;
