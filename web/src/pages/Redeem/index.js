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
  redeem_value: Yup.number().required('Insira o valor a ser resgatado'),
});

function Redeem() {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const [investmentAmount, setInvestmentAmount] = useState(0);

  useEffect(() => {
    api.get('investment').then((res) => {
      const amount = res.data;
      setInvestmentAmount(amount);
    });
  }, []);

  const onSubmit = async (data, e) => {
    const { redeem_value } = data;

    const message =
      'Valor de investimento maior que o valor presente em sua carteira!';

    if (redeem_value > investmentAmount) {
      toast.error(
        <>
          <MdMoneyOff size={30} />
          <p>{message}</p>
        </>
      );
    }

    await api.post('redeem', {
      redeem_value,
    });

    toast.success(
      <>
        <GiReceiveMoney size={30} />
        <h1>{message}</h1>
      </>
    );
    e.target.reset();

    history.push('/dashboard');
  };

  return (
    <DefaultLayout>
      <Container>
        <div>
          <div>
            <h1>Insira aqui o valor a ser resgatado!</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="number"
                placeholder="Valor a ser resgatado"
                name="redeem_value"
                ref={register}
              />
              {errors.redeem_value && (
                <span>Insira o valor e ser investido</span>
              )}
              <button type="submit">Resgatar</button>
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

export default Redeem;
