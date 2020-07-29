import React from 'react';
import { Link } from 'react-router-dom';

import DefaultLayout from '~/pages/_layouts/default';
import { Container, Menu } from './styles';

function Dashboard() {
  return (
    <DefaultLayout>
      <Container>
        <Link to="add_module">Cadastrar módulos</Link>
        <Link to="add_content">Cadastrar conteúdos</Link>
        <Menu>pontos</Menu>
      </Container>
    </DefaultLayout>
  );
}

export default Dashboard;
