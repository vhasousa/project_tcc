import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error(
      updateProfileFailure('Erro ao atualizar perfil, confira os seus dados')
    );
    yield put(updateProfileFailure());
  }
}

export function* recoverPassword({ payload }) {
  try {
    const { email } = payload;

    yield call(api.post, 'sessions/recover', { email });

    toast.success('Verifique sua caixa de entrada com token de recuperação!');

    history.push('/login');
  } catch (err) {
    toast.error(
      'Erro ao enviar token, verifique se o seu e-mail foi cadastrado corretamente'
    );
  }
}

export function* verifyToken({ payload }) {
  try {
    const { token } = payload;

    yield call(api.get, `sessions/reset/${token}`);

    toast.success('Verifique sua caixa de entrada com token de recuperação!');
  } catch (err) {
    toast.error('Erro ao atualizar sua senha, verifique o seu token');
  }
}

export function* resetPassword({ payload }) {
  try {
    const { password, confirmPassword, token } = payload;

    yield call(api.put, `users/reset`, { password, confirmPassword, token });

    toast.success('Senha atualizada com sucesso!');

    history.push('/login');
  } catch (err) {
    toast.error('Erro ao atualizar sua senha, token inválido');
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/RECOVER_PASSWORD', recoverPassword),
  takeLatest('@user/VERIFY_TOKEN', verifyToken),
  takeLatest('@user/RESET_PASSWORD', resetPassword),
]);
