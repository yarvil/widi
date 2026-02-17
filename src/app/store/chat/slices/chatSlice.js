import { createSlice } from "@reduxjs/toolkit";

import {
  loadThreads,
  loadMessagesByThreads,
  createNewThread,
} from "../chatThunks";

const initialState = {
  threads: [],
  messages: {},
  activeConversationId: null,
  currentUser: {
    id: "user-1",
    name: "Я",
    avatar: "😊",
  },
  otherUsers: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversationId = action.payload;
    },

    sendMessage: (state, action) => {
      const { conversationId, content } = action.payload;

      const newMessage = {
        id: `m${Date.now()}`,
        threadId: "",
        senderId: "user-1",
        senderUsername: "",
        content,
        createdAt: new Date().toISOString().slice(0, 19),
        messageType: "TEXT",
      };

      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }

      state.messages[conversationId].push(newMessage);

      // Обновляем последнее сообщение в списке чатов
      const conv = state.threads.find((c) => c.id === conversationId);
      if (conv) {
        conv.lastMessage = content;
        conv.timestamp = newMessage.timestamp;
      }
    },

    receiveMessage: (state, action) => {
      // Имитация получения сообщения (для будущего WebSocket)
      const { conversationId, message } = action.payload;

      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }

      state.messages[conversationId].push(message);

      const conv = state.threads.find((c) => c.id === conversationId);
      if (conv) {
        conv.lastMessage = message.content;
        conv.timestamp = message.timestamp;
        if (conversationId !== state.activeConversationId) {
          conv.unreadCount += 1;
        }
      }
    },

    deleteConversation: (state, action) => {
      const convId = action.payload;

      state.threads = state.threads.filter((conv) => conv.id !== convId);

      delete state.messages[convId];

      if (state.activeConversationId === convId) {
        state.activeConversationId = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //users

      // threads/chats
      .addCase(loadThreads.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.threads = action.payload;
      })
      .addCase(loadThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createNewThread.fulfilled, (state, action) => {
        const exists = state.threads.find((thread) => {
          return thread.id === action.payload.id;
        });

        if (!exists) {
          state.threads.unshift(action.payload);
        }
        state.activeConversationId = action.payload.id;
      })

      // messages
      .addCase(loadMessagesByThreads.fulfilled, (state, action) => {
        const { conversationId, messages } = action.payload;
        state.messages[conversationId] = messages;
      });
  },
});

export const { setActiveConversation, sendMessage, deleteConversation } =
  chatSlice.actions;
export default chatSlice.reducer;
