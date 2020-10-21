import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';
import DefaultLayout from '~/pages/_layouts/default';

import { Container } from './styles';

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const { register, handleSubmit } = useForm({
    defaultValues: profile,
  });

  const onSubmit = (data) => {
    dispatch(updateProfileRequest(data));
  };

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <DefaultLayout>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AvatarInput />
          <input name="name" placeholder="Nome completo" ref={register} />
          <input
            name="email"
            type="email"
            placeholder="Seu endereço de e-mail"
            ref={register}
          />

          <hr />

          <input
            name="oldPassword"
            type="password"
            placeholder="Sua senha atual"
            ref={register}
          />
          <input
            name="password"
            type="password"
            placeholder="Nova senha"
            ref={register}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirme a nova senha"
            ref={register}
          />

          <button type="submit">Atualizar perfil</button>
        </form>

        <button type="button" onClick={handleSignOut}>
          Sair da aplicação
        </button>
      </Container>
    </DefaultLayout>
  );
}

export default Profile;
