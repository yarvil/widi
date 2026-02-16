export function calculateUnreadCount(messages, currentUserId) {
  if (!messages || messages.lenghts === 0) {
    return 0;
  }

  return messages.filter(
    (message) => message.senderId !== currentUserId && message.isRead === false,
  ).length;
}

export const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
