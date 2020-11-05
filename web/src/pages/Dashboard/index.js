import React from 'react';
import { Link } from 'react-router-dom';

import PDFViewer from 'pdf-viewer-reactjs';

import DefaultLayout from '~/pages/_layouts/default';

import { Container } from './styles';

function Dashboard() {
  return (
    <DefaultLayout>
      <Container>
        <section>
          <Link to="modules">Acessar questões</Link>
          <Link to="invest">Investir</Link>
          <Link to="investment">Acessar investimento</Link>
        </section>
        <div>
          {/* <PDFViewer /> */}
          <PDFViewer
            document={{
              url: 'http://localhost:3333/files/1a631f1fac9c83a8.pdf',
            }}
          />
        </div>
      </Container>
    </DefaultLayout>
  );
}

export default Dashboard;
