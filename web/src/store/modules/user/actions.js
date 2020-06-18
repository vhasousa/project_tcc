export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function recoverPassword(email) {
  return {
    type: '@user/RECOVER_PASSWORD',
    payload: { email },
  };
}

export function verifyToken(token) {
  return {
    type: '@user/VERIFY_TOKEN',
    payload: { token },
  };
}

export function resetPassword(password, confirmPassword, token) {
  return {
    type: '@user/RESET_PASSWORD',
    payload: { password, confirmPassword, token },
  };
}

export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}
