import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { CSSTransition } from 'react-transition-group';
import { FiLogIn } from 'react-icons/fi';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import imgTeste from '~/assets/money.png';
import logo from '~/assets/logo_transparent.png';
import logoTeste from '~/assets/logo_teste.png';
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
      <CSSTransition in appear timeout={600} classNames="fade">
        <div>
          <section>
            <img src={logo} alt="teste" />
            <Form schema={schema} onSubmit={handleSubmit}>
              <h1>Faça o seu login</h1>
              <Input
                name="email"
                type="email"
                placeholder="Entre com seu -email"
              />
              <Input
                name="password"
                type="password"
                placeholder="Digite sua senha"
              />

              <button type="submit">
                {loading ? 'Carregando...' : 'Acessar'}
              </button>
              <Link to="/recover-password">Esqueceu a senha?</Link>
              <Link to="/register" className="register">
                {' '}
                <FiLogIn size={16} color="#8a78e4" /> Criar conta
              </Link>
            </Form>
          </section>
          <img src={imgTeste} alt="teste" />
        </div>
      </CSSTransition>
    </Container>
  );
}

export default SignIn;
