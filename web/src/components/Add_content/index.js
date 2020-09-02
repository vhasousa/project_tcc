import React, { useState, useEffect, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import api from '~/services/api';

import { Container } from './styles';

function Add_content() {
  const [grades, setGrades] = useState([]);
  // const [file, setFile] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState([]);
  const [selectedModule, setSelectedModule] = useState([]);
  const [modules, setModules] = useState([]);
  const [authors, setAuthors] = useState([]);
  const { register, control, handleSubmit } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'author',
  });

  useEffect(() => {
    api.get('grades').then((response) => {
      setGrades(response.data);
    });
    api.get('authors').then((response) => {
      setAuthors(response.data);
    });
  }, []);

  // const handleUpload = useCallback(async (e) => {
  //   const data = new FormData();

  //   data.append('file', e.target.files[0]);

  //   const response = await api.post('files', data);

  //   const { id } = response.data;

  //   setFile(id);
  // }, []);

  // This function is responsable to update the state with de selected value
  const handleSelected = useCallback(async (e) => {
    setSelectedValue(e.target.value);
  }, []);
  const handleSelectedAuthors = useCallback(
    async (e) => {
      setSelectedAuthor([...selectedAuthor, e.target.value]);
    },
    [selectedAuthor]
  );
  const handleSelectedModules = useCallback(async (e) => {
    setSelectedModule(e.target.value);
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

    await api.post('contents', {
      title,
      content,
      grade_id,
      authors: [...selectedAuthor],
      modules: [selectedModule],
    });
    e.target.reset();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="title" placeholder="Título do conteúdo" ref={register} />

        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <select
                name={`author[${index}]`}
                onChange={handleSelectedAuthors}
                ref={register}
              >
                <option value="" disabled selected>
                  Selecione o autor
                </option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>

              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => append()}>
          Adicionar autor
        </button>
        <input name="content" placeholder="Conteúdo" ref={register} />
        <select
          name="grade_id"
          value={selectedValue}
          onChange={handleSelected}
          ref={register}
        >
          <option value="" disabled selected>
            Informe o ano
          </option>
          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {`${grade.number}º ano do Ensino ${grade.level}`}
            </option>
          ))}
        </select>

        <select
          name="module_id"
          onChange={handleSelectedModules}
          ref={register()}
        >
          <option value="" disabled selected>
            Informe o módulo
          </option>
          {modules.map((module) => (
            <option key={module.id} value={module.id}>
              {`${module.title}`}
            </option>
          ))}
        </select>

        {/* <input
          type="file"
          name="attach_id"
          onChange={handleUpload}
          ref={register}
        /> */}
        <button type="submit">Cadastrar</button>
      </form>
    </Container>
  );
}

export default Add_content;
