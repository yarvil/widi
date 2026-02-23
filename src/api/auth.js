import { fetchPost } from "@/api/client";

export async function logoutApi() {
  return await fetchPost(null, "api/auth/logout");
}
