const API_BASE = "/api";

export async function fetchComments(postId) {
  const res = await fetch(`${API_BASE}/comments/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

export async function createCommentApi(postId, userId, content) {
  const res = await fetch(`${API_BASE}/comments/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, content }),
  });
  if (!res.ok) throw new Error("Failed to create comment");
  return res.json();
}
