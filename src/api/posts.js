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
