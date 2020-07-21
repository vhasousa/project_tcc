import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import DefaultLayout from '~/pages/_layouts/default';
import { Container } from './styles';
import api from '~/services/api';

function Content({ match }) {
  const { module_id } = match.params;

  const [contents, setContents] = useState([]);

  useEffect(() => {
    api.get(`contents/${module_id}`).then((response) => {
      setContents(response.data);
    });
  }, [module_id]);

  return (
    <DefaultLayout>
      <Container>
        <ul>
          {contents.map((content) => (
            <li key={content.id}>
              <p>{content.title}</p>
              <Link to={`/content/${content.id}`}>Acessar conteúdo</Link>
            </li>
          ))}
        </ul>
      </Container>
    </DefaultLayout>
  );
}

Content.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      module_id: PropTypes.string,
    }),
  }).isRequired,
};

export default Content;
