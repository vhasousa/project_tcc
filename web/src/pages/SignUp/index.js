import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft } from 'react-icons/fi';
import { CSSTransition } from 'react-transition-group';
import * as Yup from 'yup';

import registerImg from '~/assets/register.png';

import { signUpRequest } from '~/store/modules/auth/actions';
import { Container } from './styles';
import api from '~/services/api';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('A senha é obrigatório'),
  grade_id: Yup.number('Informe o seu ano').required('Informe o seu ano'),
  school_id: Yup.number('Informe sua escola').required('Informe sua escola'),
});

function SignIn() {
  const [grades, setGrades] = useState([]);
  const [schools, setSchools] = useState([]);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  useEffect(() => {
    api.get('grades').then((response) => {
      setGrades(response.data);
    });
    api.get('schools').then((response) => {
      setSchools(response.data);
    });
  }, []);

  const onSubmit = ({ name, email, password, grade_id, school_id }) => {
    dispatch(signUpRequest(name, email, password, grade_id, school_id));
  };

  return (
    <>
      <Container>
        <CSSTransition in appear timeout={600} classNames="fade">
          <div>
            <section>
              <img src={registerImg} alt="Be the Hero" />

              <h1>Cadastro</h1>
              <p>
                Faça seu cadastro, e aprenda finanças de uma forma fácil e
                divertida
              </p>

              <Link to="/login">
                <FiArrowLeft size={16} color="#555273" />
                Já tenho cadastro
              </Link>
            </section>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input name="name" placeholder="Nome completo" ref={register} />
              {errors.name && <span>{errors.name.message}</span>}
              <input
                name="email"
                type="email"
                placeholder="Entre com seu -email"
                ref={register}
              />
              {errors.email && <span>{errors.email.message}</span>}
              <input
                name="password"
                type="password"
                placeholder="Digite sua senha"
                ref={register}
              />
              {errors.password && <span>{errors.password.message}</span>}

              <select name="grade_id" ref={register}>
                <option value="" disabled selected>
                  Escolha o seu ano
                </option>
                {grades.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {`${grade.number}º ano do Ensino ${grade.level}`}
                  </option>
                ))}
              </select>
              {errors.grade_id && <span>Informe o seu ano</span>}

              <select name="school_id" ref={register}>
                <option value="" disabled selected>
                  Escolha sua escola
                </option>
                {schools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
              </select>
              {errors.school_id && <span>Informe sua escola</span>}

              <button type="submit">Cadastrar</button>
            </form>
          </div>
        </CSSTransition>
      </Container>
    </>
  );
}

export default SignIn;
