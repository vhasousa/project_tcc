import React from 'react';
import { Link } from 'react-router-dom';
import { GiMoneyStack, GiOpenBook } from 'react-icons/gi';

import { Container } from './styles';

function Score({ score }) {
  return (
    <Container>
      <h2>Sua atual pontuação é:</h2>
      <h1>{score}</h1>
      <div>
        <Link to="/invest">
          <div>
            <p>Investir</p>
            <GiMoneyStack size={20} color="#8789ff" />
          </div>
        </Link>
        <Link to="/dashboard">
          <div>
            <p>Conteúdo</p>
            <GiOpenBook size={20} color="#8789ff" />
          </div>
        </Link>
      </div>
    </Container>
  );
}

export default Score;
