import { apiRequest } from "@/pages/auth/sendRequest";

export async function fetchThreads() {
  return await apiRequest("GET", "api/chat/threads");
}

export async function createThread(otherUserId) {
  return await apiRequest("GET", `api/chat/thread/${otherUserId}`);
}
