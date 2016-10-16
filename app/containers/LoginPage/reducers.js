export default (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_FAILED':
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
