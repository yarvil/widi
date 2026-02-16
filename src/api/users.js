import { fetchGet, fetchPatch } from "@/pages/auth/sendRequest";

export async function fetchUsers() {
  return await fetchGet("api/user");
}

export async function fetchUserById(id) {
  return await fetchGet(`api/user/${id}`);
}

export async function searchUsers(query) {
  return await fetchGet(`api/user/search?q=${encodeURIComponent(query)}`);
}

export async function updateUserProfile(data) {
  return await fetchPatch(data, "api/user/update");
}
