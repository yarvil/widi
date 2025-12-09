export async function fetchPost(id) {
  const res = await fetch("/mocks/feed.json");
  const data = await res.json();
  return data.find((post) => Number(post.postId) === Number(id));
}
