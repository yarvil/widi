import { fetchDelete, fetchGet, fetchPost } from "@/pages/auth/sendRequest";

export async function followUser(targetUserId, body = null) {
  return await fetchPost(body, `api/follow/${targetUserId}`);
}

export async function unfollowUser(targetUserId) {
  return await fetchDelete(`api/follow/${targetUserId}`);
}

export async function checkFollowStatus(targetUserId) {
  return await fetchGet(`api/follow/status/${targetUserId}`);
}

export async function getMyFollowing() {
  return await fetchGet("api/follow/me/following");
}

export async function getMyFollowers() {
  return await fetchGet("api/follow/me/followers");
}
