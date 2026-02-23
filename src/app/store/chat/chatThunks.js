import { fetchMessages } from "@/api/threads";
import { fetchThreads, createThread } from "@/api/threads";
import { fetchUsers } from "@/api/users";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadThreads = createAsyncThunk("chat/loadThreads", async () => {
  return await fetchThreads();
});

export const createNewThread = createAsyncThunk(
  "chat/createThread",
  async (otherUserId) => {
    const thread = await createThread(otherUserId);
    return thread;
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
