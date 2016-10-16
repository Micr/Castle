export const registerUser = payload => ({
  type: 'REGISTER_USER',
  payload,
});

export const userRegistered = payload => ({ type: 'USER_REGISTERED', payload });

export const registrationFailed = errors => ({ type: 'USER_REGISTRATION_FAILED', payload: errors });
