import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { MdMoneyOff } from 'react-icons/md';
import { GiReceiveMoney } from 'react-icons/gi';
import { FcMoneyTransfer } from 'react-icons/fc';

import { toast } from 'react-toastify';
import DefaultLayout from '~/pages/_layouts/default';

import { Container } from './styles';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  investment: Yup.number().required('Insira o valor a ser investido'),
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

    history.push('/investment');
  };

  return (
    <DefaultLayout>
      <Container>
        <div>
          <div>
            <h1>Insira aqui o valor a ser investido!</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="number"
                placeholder="Valor a ser investido"
                name="investment"
                ref={register}
              />
              {errors.investment && <span>Insira o valor e ser investido</span>}
              <button type="submit">Investir</button>
            </form>
          </div>
          <section>
            <FcMoneyTransfer size={300} />
          </section>
        </div>
      </Container>
    </DefaultLayout>
  );
}

export default Investment;
