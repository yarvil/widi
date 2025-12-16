import { createSlice } from "@reduxjs/toolkit";
import { calculateUnreadCount } from "../../utils/chatHelpers";

//  Мои рандомные фейковые данные
const initialState = {
  conversations: [
    {
      id: "1",
      name: "Anna Moroz",
      avatar: "👩",
      lastMessage: "Hei",
      timestamp: "10:30",
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: "2",
      name: "Igor Igorovich",
      avatar: "👨",
      lastMessage: "Are you good?",
      timestamp: "Вчера",
      unreadCount: 1,
      isOnline: false,
    },
    {
      id: "3",
      name: "Team's project",
      avatar: "👥",
      lastMessage: "Встреча перенесена на 15:00",
      timestamp: "09:15",
      unreadCount: 1,
      isOnline: true,
    },
  ],
  messages: {
    1: [
      {
        id: "m1",
        senderId: "1",
        content: "Привет!",
        timestamp: "10:25",
        isOwn: false,
        isRead: false,
      },
      {
        id: "m2",
        senderId: "me",
        content: "Привет! Как дела?",
        timestamp: "10:26",
        isOwn: true,
        isRead: true,
      },
      {
        id: "m3",
        senderId: "1",
        content: "Отлично! Работаю над проектом",
        timestamp: "10:30",
        isOwn: false,
        isRead: false,
      },
    ],
    2: [
      {
        id: "m4",
        senderId: "2",
        content: "Привет, как проект?",
        timestamp: "Вчера, 18:20",
        isOwn: false,
        isRead: false,
      },
      {
        id: "m5",
        senderId: "me",
        content: "Идёт хорошо, делаю чат",
        timestamp: "Вчера, 18:25",
        isOwn: true,
        isRead: true,
      },
      {
        id: "m6",
        senderId: "2",
        content: "Созвонимся завтра?",
        timestamp: "Вчера, 18:30",
        isOwn: false,
        isRead: false,
      },
    ],
    3: [
      {
        id: "m7",
        senderId: "3",
        content: "Всем привет!",
        timestamp: "09:00",
        isOwn: false,
        isRead: false,
      },
      {
        id: "m8",
        senderId: "me",
        content: "Привет команда!",
        timestamp: "09:05",
        isOwn: true,
        isRead: true,
      },
      {
        id: "m9",
        senderId: "4",
        content: "Встреча перенесена на 15:00",
        timestamp: "09:15",
        isOwn: false,
        isRead: false,
      },
    ],
  },
  activeConversationId: "1",
  currentUser: {
    id: "me",
    name: "Я",
    avatar: "😊",
  },
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
        senderId: "me",
        content,
        timestamp: new Date().toLocaleTimeString("eu-EU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
        isRead: true,
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
  },
});

export const { setActiveConversation, sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
