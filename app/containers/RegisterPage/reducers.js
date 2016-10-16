export default (state = {}, action) => {
  switch (action.type) {
    case 'USER_REGISTRATION_FAILED':
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
