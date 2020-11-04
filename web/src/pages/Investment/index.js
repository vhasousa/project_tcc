import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { MdMoneyOff } from 'react-icons/md';
import { GiReceiveMoney } from 'react-icons/gi';

import { toast } from 'react-toastify';
import DefaultLayout from '~/pages/_layouts/default';

import { Container } from './styles';

import api from '~/services/api';

const schema = Yup.object().shape({
  investment: Yup.number().required('O nome é obrigatório'),
});

function Investment() {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const [walletAmount, setWalletAmount] = useState(0);

  useEffect(() => {
    api.get('score').then((res) => {
      const amount = res.data;
      setWalletAmount(amount);
    });
  }, []);

  const onSubmit = async (data, e) => {
    const { investment } = data;

    const message =
      'Valor de investimento maior que o valor presente em sua carteira!';

    if (investment > walletAmount) {
      toast.error(
        <>
          <MdMoneyOff size={30} />
          <p>{message}</p>
        </>
      );
    }

    await api.post('investment', {
      investment,
    });

    toast.success(
      <>
        <GiReceiveMoney size={30} />
        <h1>{message}</h1>
      </>
    );
    e.target.reset();
  };

  return (
    <DefaultLayout>
      <Container>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="number" name="investment" ref={register} />
            {errors.investment && <span>{errors.investment.message}</span>}
            <button type="submit">Investir</button>
          </form>
        </div>
      </Container>
    </DefaultLayout>
  );
}

export default Investment;
