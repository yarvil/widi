export async function toggleLikeApi(postId, userId) {
  const res = await fetch(`/api/likes/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) throw new Error("Failed to toggle like");
  return res.json();
}
