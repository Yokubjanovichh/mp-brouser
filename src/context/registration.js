export const reRegistration = (state = false, action) => {
  switch (action.type) {
    case 'OPEN_REGISTRATION':
      return action.payload || true;
    case 'CLOSE_REGISTRATION':
      return false;
    default:
      return state;
  }
};
