import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '~/assets/logo_dash.png';
import { Container, Content, Profile } from './styles';
import api from '~/services/api';

export default function Header() {
  const profile = useSelector((state) => state.user.profile);

  const [count, setCount] = useState(0);

  useEffect(() => {
    api.get('score').then((res) => {
      const score = res.data;
      setCount(score);
    });
  }, []);

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
            <strong>Carteira: {count}pt</strong>
          </div>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="profile">Meu perfil</Link>
            </div>
            <img src="" alt="" />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
