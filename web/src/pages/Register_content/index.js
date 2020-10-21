import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import api from '~/services/api';

import { Container } from './styles';

function Register_content() {
  const [grades, setGrades] = useState([]);
  const [file, setFile] = useState([]);
  const { register, handleSubmit } = useForm({});

  useEffect(() => {
    api.get('grades').then((response) => {
      setGrades(response.data);
    });
  }, []);

  const handleUpload = useCallback(async (e) => {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id } = response.data;

    setFile(id);
  }, []);

  const onSubmit = async (data, e) => {
    const { title, grade_id } = data;

    await api.post('contents', {
      title,
      grade_id,
      attach_id: file,
    });
    e.target.reset();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="title" placeholder="Título do conteúdo" ref={register} />

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

        <input
          type="file"
          name="attach_id"
          onChange={handleUpload}
          ref={register}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </Container>
  );
}

export default Register_content;
