import { apiRequest } from "@/pages/auth/sendRequest";

export async function fetchFeed(page = 0, size = 20) {
  return await apiRequest(
    "GET",
    `api/posts/recommended?page=${page}&size=${size}`,
  );
}

export async function fetchMyFeed(page = 0, size = 20) {
  return await apiRequest("GET", `api/posts/feed?page=${page}&size=${size}`);
}

export async function fetchPost(id) {
  return await apiRequest("GET", `api/posts/${id}`);
}

export async function createPostApi(content, imageUrl = null) {
  const body = { content };
  if (imageUrl) body.imageUrl = imageUrl;
  return await apiRequest("POST", "api/posts", body);
}

export async function updatePostApi(postId, content, imageUrl = null) {
  const body = {};
  if (content !== undefined) body.content = content;
  if (imageUrl !== undefined) body.imageUrl = imageUrl;
  return await apiRequest("PATCH", `api/posts/${postId}`, body);
}

export async function deletePostApi(postId) {
  return await apiRequest("DELETE", `api/posts/${postId}`);
}

export async function savePostApi(postId) {
  return await apiRequest("POST", `api/posts/${postId}/save`);
}

export async function unsavePostApi(postId) {
  return await apiRequest("DELETE", `api/posts/${postId}/save`);
}
export async function fetchSavedPostsApi(page = 0, size = 20) {
  return await apiRequest("GET", `api/posts/saved?page=${page}&size=${size}`);
}
