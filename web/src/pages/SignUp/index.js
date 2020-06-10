import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import registerImg from '~/assets/register.png';

import { signUpRequest } from '~/store/modules/auth/actions';
import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('A senha é obrigatório'),
});

function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <Container>
        <div>
          <section>
            <img src={registerImg} alt="Be the Hero" />

            <h1>Cadastro</h1>
            <p>
              Faça seu cadastro, e aprenda finanças de uma fácil e divertida
            </p>

            <Link to="/login">
              <FiArrowLeft size={16} color="#e02141" />
              Não tenho cadastro
            </Link>
          </section>

          <Form schema={schema} onSubmit={handleSubmit}>
            <Input name="name" placeholder="Nome completo" />
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

            <button className="button" type="submit">
              Cadastrar
            </button>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default SignIn;
