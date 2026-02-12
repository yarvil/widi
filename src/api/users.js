import { apiRequest } from "@/pages/auth/sendRequest";

export async function fetchUsers() {
  return await apiRequest("GET", "api/user");
}

export async function fetchUserById(id) {
  return await apiRequest("GET", `api/user/${id}`);
}

export async function searchUsers(query) {
  return await apiRequest(
    "GET",
    `api/user/search?q=${encodeURIComponent(query)}`,
  );
}

export async function updateUserProfile(data) {
  return await apiRequest("PATCH", "api/user/update", data);
}
