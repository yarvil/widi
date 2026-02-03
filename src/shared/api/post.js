const API_BASE = "/api";

export async function fetchFeed(page = 0, size = 20) {
  const res = await fetch(`${API_BASE}/posts/feed?page=${page}&size=${size}`);
  if (!res.ok) throw new Error("Failed to fetch feed");
  return res.json();
}

export async function fetchPost(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`);
  if (!res.ok) throw new Error("Post not found");
  return res.json();
}

export async function createPostApi(content, imageUrl = null) {
  const body = { content };
  if (imageUrl) body.imageUrl = imageUrl;

  const res = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}
