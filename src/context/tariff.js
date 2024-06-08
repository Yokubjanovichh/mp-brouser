export const reTariff = (state = false, action) => {
  switch (action.type) {
    case 'OPEN_TARIFF':
      return true;
    case 'CLOSE_TARIFF':
      return false;
    default:
      return state;
  }
};
