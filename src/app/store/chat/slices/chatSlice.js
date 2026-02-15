import { createSlice } from "@reduxjs/toolkit";
import { calculateUnreadCount } from "@/pages/chat/utils/chatHelper";

import { loadThreads, loadMessagesByThreads, loadUsers } from "../chatThunks";

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
      const conversationId = action.payload;
      state.activeConversationId = conversationId;

      const messages = state.messages[conversationId] || [];

      messages.forEach((message) => {
        if (message.senderId !== state.currentUser.id) {
          message.isRead = true;
        }
      });

      const unreadCount = calculateUnreadCount(messages, state.currentUser.id);
      // Сброс непрочитанные сообщения
      const conv = state.conversations.find((c) => c.id === action.payload);
      if (conv) {
        conv.unreadCount = unreadCount;
      }
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
        // timestamp: new Date().toLocaleTimeString("eu-EU", {
        //   hour: "2-digit",
        //   minute: "2-digit",
        // }),
        // isOwn: true,
        // isRead: true,
      };

      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }

      state.messages[conversationId].push(newMessage);

      // Обновляем последнее сообщение в списке чатов
      const conv = state.conversations.find((c) => c.id === conversationId);
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

      const conv = state.conversations.find((c) => c.id === conversationId);
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

      state.conversations = state.conversations.filter(
        (conv) => conv.id !== convId,
      );

      delete state.messages[convId];

      if (state.activeConversationId === convId) {
        state.activeConversationId = null;
      }
    },
    createNewConversation: (state, action) => {
      const otherUserId = action.payload;

      // Проверка: чат уже существует?
      const existingConv = state.conversations.find((conv) =>
        conv.participants.some((p) => p.id === otherUserId),
      );

      if (existingConv) {
        // Уже есть - просто открываем
        state.activeConversationId = existingConv.id;
        return;
      }

      // Находим выбранного юзера
      const otherUser = state.otherUsers.find((u) => u.id === otherUserId);
      if (!otherUser) return;

      // Создаём новый чат
      const newConv = {
        id: Date.now(), // Генерю уникальный ID
        participants: [
          {
            id: state.currentUser.id,
            firstName: state.currentUser.name,
            // ... другие поля currentUser
          },
          otherUser, // выбранный юзер
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        unreadCount: 0,
        lastMessage: null,
        timestamp: null,
      };

      // Добавляем в начало списка
      state.conversations.unshift(newConv);

      // Создаём пустой массив сообщений
      state.messages[newConv.id] = [];

      // Открываем новый чат
      state.activeConversationId = newConv.id;
    },
  },
  extraReducers: (builder) => {
    builder
      //users
      .addCase(loadUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.otherUsers = Object.values(action.payload).filter(
          (user) => user.id !== "user-1",
        );
      })

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

      // messages
      .addCase(loadMessagesByThreads.fulfilled, (state, action) => {
        const { conversationId, messages } = action.payload;
        state.messages[conversationId] = messages;
      });
  },
});

export const {
  setActiveConversation,
  sendMessage,
  deleteConversation,
  createNewConversation,
} = chatSlice.actions;
export default chatSlice.reducer;
