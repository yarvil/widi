import { apiRequest } from "@/pages/auth/sendRequest";

export async function followUser(targetUserId) {
  return await apiRequest("POST", `api/follow/${targetUserId}`);
}

export async function unfollowUser(targetUserId) {
  return await apiRequest("DELETE", `api/follow/${targetUserId}`);
}

export async function checkFollowStatus(targetUserId) {
  return await apiRequest("GET", `api/follow/status/${targetUserId}`);
}

export async function getMyFollowing() {
  return await apiRequest("GET", "api/follow/me/following");
}

export async function getMyFollowers() {
  return await apiRequest("GET", "api/follow/me/followers");
}
