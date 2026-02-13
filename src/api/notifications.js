import { apiRequest } from "@/pages/auth/sendRequest";
export async function fetchMyNotifications(page = 0, size = 20) {
  return await apiRequest(
    "GET",
    `api/notifications?page=${page}&size=${size}`, 
  );
}
export async function subscribeToUser(targetUserId) {
  return await apiRequest(
    "POST",
    `api/notifications/subscriptions/${targetUserId}`
  );
}
export async function unsubscribeToUser(targetUserId) {
  return await apiRequest(
    "DELETE",
    `api/notifications/subscriptions/${targetUserId}`
  );
}
export async function readAllNotifications() {
    'POST',
    'api/notifications/read-all'
    
}