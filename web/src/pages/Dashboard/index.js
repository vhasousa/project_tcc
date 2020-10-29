import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PDFViewer from 'pdf-viewer-reactjs';

import DefaultLayout from '~/pages/_layouts/default';
import api from '~/services/api';

import { Container } from './styles';

function Dashboard() {
  const [pdf, setPdf] = useState([]);

  useEffect(() => {
    api.get('contents').then((response) => {});
  }, []);

  return (
    <DefaultLayout>
      <Container>
        <PDFViewer
          document={{
            url: 'http://localhost:3333/files/0023a38ddc01fc20.pdf',
          }}
        />
        <Link to="modules">Acessar questões</Link>
      </Container>
    </DefaultLayout>
  );
}

export default Dashboard;
