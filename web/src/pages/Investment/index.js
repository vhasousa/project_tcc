import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GiMoneyStack, GiOpenBook } from 'react-icons/gi';

import DefaultLayout from '~/pages/_layouts/default';

import { Container } from './styles';

import api from '~/services/api';

function Investment() {
  const [investedValue, setInvestedValue] = useState(0);

  useEffect(() => {
    api.get('investment').then((res) => {
      const value = res.data;
      setInvestedValue(value);
    });
  }, []);

  return (
    <DefaultLayout>
      <Container>
        <h2>Valor investido:</h2>
        <h1>{investedValue}</h1>
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
    </DefaultLayout>
  );
}

export default Investment;
