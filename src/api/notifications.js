import { apiRequest } from "@/api/client";
export async function fetchMyNotifications(page = 0, size = 20) {
  return await apiRequest("GET", `api/notifications?page=${page}&size=${size}`);
}
export async function subscribeToUser(targetUserId) {
  return await apiRequest(
    "POST",
    `api/notifications/subscriptions/${targetUserId}`,
  );
}
export async function unsubscribeToUser(targetUserId) {
  return await apiRequest(
    "DELETE",
    `api/notifications/subscriptions/${targetUserId}`,
  );
}
export async function readAllNotifications() {
  ("POST", "api/notifications/read-all");
}
export async function readNotification(notificationId) {
  return await apiRequest("POST", `api/notifications/${notificationId}/read`);
}
export async function deleteNotification(notificationId) {
  return await apiRequest("DELETE", `api/notifications/${notificationId}`);
}
export async function allNotificationsCount() {
  return await apiRequest('GET', 'api/notifications/unread-count');
  
}
