export async function fetchReplies(postId) {
  const res = await fetch("/mocks/replies.json");
  const allReplies = await res.json();

  return allReplies.filter((reply) => {
    if (Number(reply.parentId) === Number(postId)) {
      return true;
    }
    const parent = allReplies.find(
      (r) => Number(r.postId) === Number(reply.parentId)
    );
    return parent && Number(parent.parentId) === Number(postId);
  });
}
