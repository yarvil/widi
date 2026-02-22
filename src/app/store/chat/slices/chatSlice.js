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
  currentUser: {},
  otherUsers: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversationId: (state, action) => {
      state.activeConversationId = action.payload;
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

    setOtherUsers: (state, action) => {
      const users = action.payload;
      const otherUserIds = state.threads
        .map((thread) => thread.otherParticipant?.id)
        .filter(Boolean);

      state.otherUsers = users.filter((user) => otherUserIds.includes(user.id));
    },

    sendMessage: (state, action) => {
      const { threadId, content } = action.payload;

      const newMessage = {
        id: `temp-${Date.now()}`, // временный id
        threadId: threadId,
        senderId: state.currentUser.id,
        senderUsername: state.currentUser.nickName,
        content,
        createdAt: new Date().toISOString(),
        messageType: "TEXT",
        status: "sending",
      };

      if (!state.messages[threadId]) state.messages[threadId] = [];
      state.messages[threadId].push(newMessage);

      // Обновляем последний message в threads
      const thread = state.threads.find((t) => t.id === threadId);
      if (thread) {
        thread.lastMessage = content;
        thread.updatedAt = newMessage.createdAt;
      }
    },

    receiveMessage: (state, action) => {
      const { threadId, message } = action.payload;

      if (!state.messages[threadId]) state.messages[threadId] = [];

      // Проверяем, нет ли дубликата
      if (!state.messages[threadId].some((m) => m.id === message.id)) {
        state.messages[threadId].push(message);
      }

      // Обновляем последний message в threads
      const thread = state.threads.find((t) => t.id === threadId);
      if (thread) {
        thread.lastMessage = message.content;
        thread.updatedAt = message.createdAt;
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
        console.log(state.messages[conversationId], "smsk");
      });
  },
});

export const {
  setActiveConversationId,
  setCurrentUser,
  sendMessage,
  receiveMessage,
  deleteConversation,
  setOtherUsers,
} = chatSlice.actions;
export default chatSlice.reducer;
