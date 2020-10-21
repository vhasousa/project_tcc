import React, { useState, useEffect } from 'react';
import PDFViewer from 'pdf-viewer-reactjs';

import DefaultLayout from '~/pages/_layouts/default';
import api from '~/services/api';

function Dashboard() {
  const [pdf, setPdf] = useState([]);

  useEffect(() => {
    api.get('contents').then((response) => {});
  }, []);

  return (
    <DefaultLayout>
      <PDFViewer
        document={{
          url: 'http://localhost:3333/files/0023a38ddc01fc20.pdf',
        }}
      />
    </DefaultLayout>
  );
}

export default Dashboard;
