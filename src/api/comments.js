import { apiRequest } from "@/pages/auth/sendRequest";

export async function fetchComments(postId) {
  return await apiRequest("GET", `api/comments/${postId}`);
}

export async function createCommentApi(postId, userId, content) {
  return await apiRequest("POST", `api/comments/${postId}`, {
    userId,
    content,
  });
}
