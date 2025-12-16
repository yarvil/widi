import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";

import chatReducer from "./chat/slices/chatSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    //місце для вашіх редюсерів :)

    // Kostiantyn's chat reducer
    chat: chatReducer,
  },
});
