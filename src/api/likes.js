import { apiRequest } from "@/pages/auth/sendRequest";

export async function toggleLikeApi(postId, userId) {
  return await apiRequest("POST", `api/likes/${postId}`, { userId });
}
