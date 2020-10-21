import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import DefaultLayout from '~/pages/_layouts/default';

import { Container } from './styles';
import api from '~/services/api';

function ContentDetail({ match }) {
  const { content_id } = match.params;

  const [content, setContent] = useState([]);

  useEffect(() => {
    api.get(`content/${content_id}`).then((response) => {
      setContent(response.data);
    });
  }, [content_id]);

  return (
    <DefaultLayout>
      <Container>
        <h3>{content.title}</h3>
        <p>{content.content}</p>
      </Container>
    </DefaultLayout>
  );
}

ContentDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      content_id: PropTypes.string,
    }),
  }).isRequired,
};

export default ContentDetail;
