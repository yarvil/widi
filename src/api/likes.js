// import { apiRequest } from "@/pages/auth/sendRequest";

// export async function toggleLikeApi(postId, userId) {
//   return await apiRequest("POST", `api/likes/${postId}`, { userId });
// }

const likedPosts = new Set();

export async function toggleLikeApi(postId) {
  const res = await fetch("/mocks/feed.json");
  const posts = await res.json();
  const post = posts.find((p) => p.id === postId);

  if (likedPosts.has(postId)) {
    likedPosts.delete(postId);
    return {
      postId,
      userId: "user-1",
      liked: false,
      totalLikes: (post?.likesCount || 1) - 1,
    };
  }

  likedPosts.add(postId);
  return {
    postId,
    userId: "user-1",
    liked: true,
    totalLikes: (post?.likesCount || 0) + 1,
  };
}
