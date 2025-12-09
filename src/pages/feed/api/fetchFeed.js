export async function fetchFeed() {
  const res = await fetch("/mocks/feed.json");
  const posts = await res.json();
  return posts.filter((posts) => !posts.parentId);
}
