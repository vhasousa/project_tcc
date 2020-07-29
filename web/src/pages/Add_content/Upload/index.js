import React, { useState } from 'react';

import api from '~/services/api';

function Upload() {
  const [file, setFile] = useState([]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id } = response.data;

    setFile(id);
  }

  return <input type="file" data-file={file} onChange={handleChange} />;
}

export default Upload;
