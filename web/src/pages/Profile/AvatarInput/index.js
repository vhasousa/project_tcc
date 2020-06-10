import React from 'react';

import { Container } from './styles';

function AvatarInput() {
  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src="https://api.adorable.io/avatars/120/abott@adorable.png"
          alt=""
        />

        <input type="file" id="avatar" accept="image/*" />
      </label>
    </Container>
  );
}

export default AvatarInput;
