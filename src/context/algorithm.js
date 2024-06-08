export const reAlgorithm = (state = false, action) => {
  switch (action.type) {
    case "OPEN_ALGORITHM":
      return action.payload || true;
    case "CLOSE_ALGORITHM":
      return false;
    default:
      return state;
  }
};
