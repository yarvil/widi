import { apiRequest } from "@/pages/auth/sendRequest";

export async function fetchThreads(userId) {
  const response = await apiRequest("GET", "/api/chat/threads");
  const data = await response.json();
  return data.filter((thread) =>
    thread.participants.some((participant) => participant.id === userId),
  );
}
