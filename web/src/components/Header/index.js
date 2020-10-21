import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '~/assets/logo_dash.png';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector((state) => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            {' '}
            <img src={logo} alt="imgLogo" />
          </Link>
        </nav>

        <aside>
          <div>
            <strong>Carteira: 500pt</strong>
          </div>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="profile">Meu perfil</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.png"
              alt=""
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
