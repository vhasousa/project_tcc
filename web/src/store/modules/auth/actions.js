export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInConfirmation(email) {
  return {
    type: '@auth/SIGN_IN_CONFIRMATION',
    payload: { email },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signUpRequest(name, email, password, grade_id) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, password, grade_id },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
