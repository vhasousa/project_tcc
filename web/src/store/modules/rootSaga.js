import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import score from './score/sagas';

export default function* rootSaga() {
  return yield all([auth, user, score]);
}
