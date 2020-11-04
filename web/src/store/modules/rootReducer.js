import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import score from './score/reducer';

export default combineReducers({
  auth,
  user,
  score,
});
