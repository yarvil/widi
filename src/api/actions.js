import { fetchDelete, fetchPost } from "@/api/client";

export async function toggleLikeApi(postId, userId) {
  return await fetchPost({ userId }, `api/likes/${postId}`);
}

export async function savePostApi(postId, body = null) {
  return await fetchPost(body, `api/posts/${postId}/save`);
}

export async function unsavePostApi(postId) {
  return await fetchDelete(`api/posts/${postId}/save`);
}
