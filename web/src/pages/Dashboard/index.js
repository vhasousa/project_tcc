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
          <Link to="investment">Carteira de investimento</Link>
          <Link to="redeem">Resgate de investimento</Link>
        </section>
        <div>
          {/* <PDFViewer /> */}
          <PDFViewer
            document={{
              url: 'http://localhost:3333/files/40456ad5748f32ac.pdf',
            }}
          />
        </div>
      </Container>
    </DefaultLayout>
  );
}

export default Dashboard;
