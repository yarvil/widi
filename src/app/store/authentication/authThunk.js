import { setStatusMessage, clearStatusMessage } from "./authSlice";

const showStatusMessage =
  ({ message, type, error = null }) =>
  (dispatch) => {
    let messageContent = message;
    let typeMessage = type;

    if (!window.navigator.onLine) {
      messageContent = "Відсутнє інтернет підключення";
      typeMessage = "error";
      dispatch(
        setStatusMessage({ message: messageContent, type: typeMessage }),
      );
      setTimeout(() => dispatch(clearStatusMessage()), 4000);
      return;
    }

    if (error !== null) {
      if (error?.response) {
        const errorStatus = error?.response?.status;
        const errorMessage = error?.response?.data?.message;

        messageContent = `Відбулася помилка №${errorStatus}, ${errorMessage}`;
        typeMessage = "error";
      } else if (error?.message) {
        console.error("status", error.message);
        messageContent = `Відбулася помилка: ${error.message}`;
        typeMessage = "error";
      } else {
        messageContent = "Невідома помилка";
        typeMessage = "error";
      }
    }

    dispatch(setStatusMessage({ message: messageContent, type: typeMessage }));
    setTimeout(() => dispatch(clearStatusMessage()), 4000);
  };

export { showStatusMessage };
