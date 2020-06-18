import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';
import DefaultLayout from '~/pages/_layouts/default';

import { Container } from './styles';

function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <DefaultLayout>
      <Container>
        <Form initialData={profile} onSubmit={handleSubmit}>
          <AvatarInput />
          <Input name="name" placeholder="Nome completo" />
          <Input
            name="email"
            type="email"
            placeholder="Seu endereço de e-mail"
          />

          <hr />

          <Input
            name="oldPassword"
            type="password"
            placeholder="Sua senha atual"
          />
          <Input name="password" type="password" placeholder="Nova senha" />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirme a nova senha"
          />

          <button type="submit">Atualizar perfil</button>
        </Form>

        <button type="button" onClick={handleSignOut}>
          Sair da aplicação
        </button>
      </Container>
    </DefaultLayout>
  );
}

export default Profile;
