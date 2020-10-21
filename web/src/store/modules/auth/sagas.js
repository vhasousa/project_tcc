import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    if (!user.confirmed) {
      toast.error('E-mail não confirmado');
      history.push('/confirmation');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    if (user.student) {
      history.push('/dashboard');
    } else {
      history.push('/dashboard_adm');
    }
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function* signInConfirmation({ payload }) {
  const { email } = payload;

  yield call(api.post, 'sessions/confirmation', {
    email,
  });

  history.push('/login');
}

export function* signUp({ payload }) {
  try {
    const { name, email, password, grade_id, school_id } = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
      grade_id,
      school_id,
      student: true,
    });

    history.push('/login');
  } catch (erro) {
    toast.error('Falha no cadastro, verique seus dados');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/login');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('@auth/SIGN_IN_CONFIRMATION', signInConfirmation),
]);
