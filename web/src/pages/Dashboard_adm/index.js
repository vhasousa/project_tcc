import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import DefaultLayout from '~/pages/_layouts/default';
import { Container, Menu } from './styles';
import api from '~/services/api';

function Dashboard() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    api.get('modules').then((response) => {
      setModules(response.data);
    });
  }, []);

  return (
    <DefaultLayout>
      <Container>
        <p>+</p>
        <Menu>pontos</Menu>
      </Container>
    </DefaultLayout>
  );
}

export default Dashboard;
