import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import api from '~/services/api';

import { Container } from './styles';

const schema = Yup.object().shape({
  title: Yup.string('Aqui só é permitido números').required(
    'Informe o número do módulo'
  ),
  description: Yup.string().required('Insira a descrição deste módulo'),
  grade_id: Yup.number('Informe o ano referente ao módulo').required(
    'Informe o ano'
  ),
  introduction: Yup.string().required(),
});

function Add_module() {
  const history = useHistory();
  const [grades, setGrades] = useState([]);
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  useEffect(() => {
    api.get('grades').then((response) => {
      setGrades(response.data);
    });
  }, []);

  const onSubmit = async (data, e) => {
    await api.post('modules', data);
    e.target.reset();
    history.push('./step2');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="title" placeholder="Título do módulo" ref={register} />
        {errors.title && <span>É necessário que seja um número</span>}
        <input
          name="description"
          placeholder="Descrição do módulo"
          ref={register}
        />
        {errors.description && <span>{errors.description.message}</span>}
        <input
          name="introduction"
          placeholder="Introdução ao módulo"
          ref={register}
        />
        <select name="grade_id" ref={register}>
          <option value="" disabled selected>
            Informe o ano
          </option>
          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {`${grade.number}º ano do Ensino ${grade.level}`}
            </option>
          ))}
        </select>
        {errors.grade_id && <span>Informe o ano</span>}
        <button type="submit">Próximo</button>
      </form>
    </Container>
  );
}

Add_module.propTypes = {};

export default Add_module;
