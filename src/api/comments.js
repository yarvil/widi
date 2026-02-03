// import { apiRequest } from "@/pages/auth/sendRequest";

// export async function fetchComments(postId) {
//   return await apiRequest("GET", `api/comments/${postId}`);
// }

// export async function createCommentApi(postId, userId, content) {
//   return await apiRequest("POST", `api/comments/${postId}`, {
//     userId,
//     content,
//   });
// }

export async function fetchComments(postId) {
  const res = await fetch("/mocks/comments.json");
  const data = await res.json();
  return data[postId] || [];
}

export async function createCommentApi(postId, userId, content) {
  return {
    id: `comment-${Date.now()}`,
    content,
    authorId: userId,
    postId,
    createdAt: new Date().toISOString(),
  };
}
