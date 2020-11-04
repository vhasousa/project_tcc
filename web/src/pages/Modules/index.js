import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsQuestion } from 'react-icons/bs';

import DefaultLayout from '~/pages/_layouts/default';

import { Container, Content } from './styles';
import api from '~/services/api';

function Modules() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    api.get(`modules`).then((response) => {
      setModules(response.data);
    });
  }, []);

  return modules.length > 0 ? (
    <DefaultLayout>
      <Container>
        {modules.map((module) => (
          <div>
            <div>
              <Content>
                <h1>Módulo: {module.number}</h1>
                <h2>{module.description}</h2>
              </Content>
              <aside>
                <BsQuestion size={100} />
              </aside>
            </div>
            <Link style={{ color: '#fff' }} to={`/questions/${module._id}`}>
              Acessar questionário
            </Link>
          </div>
        ))}
      </Container>
    </DefaultLayout>
  ) : (
    <h1>Carregando...</h1>
  );
}

export default Modules;
