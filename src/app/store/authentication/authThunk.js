import { setStatusMessage, clearStatusMessage } from "./authSlice";

const showStatusMessage =
  ({ message, type }) =>
  (dispatch) => {
    dispatch(setStatusMessage({ message: message, type: type }));
    setTimeout(() => dispatch(clearStatusMessage()), 4000);
  };

export { showStatusMessage };
