// import { apiRequest } from "@/pages/auth/sendRequest";

// export async function fetchFeed(page = 0, size = 20) {
//   return await apiRequest("GET", `api/posts/feed?page=${page}&size=${size}`);
// }

// export async function fetchPost(id) {
//   return await apiRequest("GET", `api/posts/${id}`);
// }

// export async function createPostApi(content, imageUrl = null) {
//   const body = { content };
//   if (imageUrl) body.imageUrl = imageUrl;
//   return await apiRequest("POST", "api/posts", body);
// }

export async function fetchFeed() {
  const res = await fetch("/mocks/feed.json");
  return res.json();
}

export async function fetchPost(id) {
  const res = await fetch("/mocks/feed.json");
  const data = await res.json();
  return data.find((post) => post.id === id);
}

export async function createPostApi(content, imageUrl = null) {
  return {
    id: `post-${Date.now()}`,
    content,
    imageUrl,
    author: {
      id: "user-1",
      firstName: "Ярослав",
      lastName: "Козак",
      avatarUrl:
        "https://pbs.twimg.com/profile_images/1175026726155575296/QLVwDQYh_x96.jpg",
    },
    createdAt: new Date().toISOString(),
    likesCount: 0,
    commentsCount: 0,
    repostsCount: 0,
    quotesCount: 0,
  };
}
