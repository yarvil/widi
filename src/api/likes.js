import { fetchPost } from "@/pages/auth/sendRequest";

export async function toggleLikeApi(postId, userId) {
  return await fetchPost({ userId }, `api/likes/${postId}`);
}
