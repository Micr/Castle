export const userLogin = credentials => ({
  type: 'USER_LOGIN',
  payload: credentials,
});

export const loginError = data => ({
  type: 'USER_LOGIN_FAILED',
  payload: data,
});
