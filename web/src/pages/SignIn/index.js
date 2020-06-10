import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import imgTeste from '~/assets/money.png';
import logo from '~/assets/logo_transparent.png';
import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatório'),
});

function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <section>
        <img src={logo} alt="teste" />
        <Form schema={schema} onSubmit={handleSubmit}>
          <h1>Faça o seu login</h1>
          <Input name="email" type="email" placeholder="Entre com seu -email" />
          <Input
            name="password"
            type="password"
            placeholder="Digite sua senha"
          />

          <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
          <Link to="/register">Criar conta</Link>
        </Form>
      </section>
      <img src={imgTeste} alt="teste" />
    </Container>
  );
}

export default SignIn;
