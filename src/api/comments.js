import { fetchGet, fetchPost } from "@/pages/auth/sendRequest";

export async function fetchComments(postId) {
  return await fetchGet(`api/comments/${postId}`);
}

export async function createCommentApi(postId, userId, content) {
  return await fetchPost(
    {
      userId,
      content,
    },
    `api/comments/${postId}`,
  );
}
