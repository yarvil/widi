import {
  fetchDelete,
  fetchGet,
  fetchPatch,
  fetchPost,
} from "@/pages/auth/sendRequest";

export async function fetchFeed(page = 0, size = 20) {
  return await fetchGet(`api/posts/recommended?page=${page}&size=${size}`);
}

export async function fetchMyFeed(page = 0, size = 20) {
  return await fetchGet(`api/posts/feed?page=${page}&size=${size}`);
}

export async function fetchCurPost(id) {
  return await fetchGet(`api/posts/${id}`);
}

export async function createPostApi(content, imageUrl = null) {
  const body = { content };
  if (imageUrl) body.imageUrl = imageUrl;
  return await fetchPost(body, "api/posts");
}

export async function updatePostApi(postId, content, imageUrl = null) {
  const body = {};
  if (content !== undefined) body.content = content;
  if (imageUrl !== undefined) body.imageUrl = imageUrl;
  return await fetchPatch(body, `api/posts/${postId}`);
}

export async function deletePostApi(postId) {
  return await fetchDelete(`api/posts/${postId}`);
}

export async function savePostApi(postId, body = null) {
  return await fetchPost(body, `api/posts/${postId}/save`);
}

export async function unsavePostApi(postId) {
  return await fetchDelete(`api/posts/${postId}/save`);
}

export async function fetchSavedPostsApi(page = 0, size = 20) {
  return await fetchGet(`api/posts/saved?page=${page}&size=${size}`);
}

export async function fetchUserPosts(userId, page = 0, size = 20) {
  return await fetchGet(`api/posts/user/${userId}?page=${page}&size=${size}`);
}
