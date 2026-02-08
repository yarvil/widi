import { fetchMessages } from "@/api/messages";
import { fetchThreads } from "@/api/threads";
import { fetchUsers } from "@/api/users";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadConversations = createAsyncThunk(
  "chat/loadConversations",
  async (userId) => {
    return await fetchThreads(userId);
  },
);

export const loadMessagesByThreads = createAsyncThunk(
  "chat/loadMessagesByConversation",
  async (conversationId) => {
    const messages = await fetchMessages(conversationId);
    return { conversationId, messages };
  },
);

export const loadUsers = createAsyncThunk("chat/loadUsers", async () => {
  const users = await fetchUsers();
  return users;
});
