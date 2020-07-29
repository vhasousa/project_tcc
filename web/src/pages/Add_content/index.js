import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import api from '~/services/api';

import { Container } from './styles';

function Add_content() {
  const [grades, setGrades] = useState([]);
  const [file, setFile] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [modules, setModules] = useState([]);
  const { register, handleSubmit } = useForm([]);

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

  // This function is responsable to update de state with de selected value
  const handleSelected = useCallback(async (e) => {
    setSelectedValue(e.target.value);
  }, []);

  // This function call the api to list the modules related to the selected
  // grade
  useEffect(() => {
    api.get(`modules/${selectedValue}`).then((response) => {
      setModules(response.data);
    });
  }, [selectedValue]);

  const onSubmit = async (data, e) => {
    const { title, content, grade_id } = data;

    await api.post('contents', { title, content, attach_id: file, grade_id });
    e.target.reset();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="title" placeholder="Título do conteúdo" ref={register} />
        <input name="content" placeholder="Conteúdo" ref={register} />
        <input
          type="file"
          name="attach_id"
          onChange={handleUpload}
          ref={register}
        />
        <select
          name="grade_id"
          value={selectedValue}
          onChange={handleSelected}
          ref={register}
        >
          <option value="" disabled selected>
            Escolha o seu ano
          </option>
          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {`${grade.number}º ano do Ensino ${grade.level}`}
            </option>
          ))}
        </select>

        <select name="module_id" ref={register}>
          <option value="" disabled selected>
            Escolha o módulo
          </option>
          {modules.map((module) => (
            <option key={module.id} value={module.id}>
              {`${module.number}`}
            </option>
          ))}
        </select>

        <button type="submit">Cadastrar</button>
      </form>
    </Container>
  );
}

export default Add_content;
