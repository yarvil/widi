import { createSelector } from "@reduxjs/toolkit";

export const selectChatState = (state) => state.chat;
export const selectThreads = (state) => state.chat.threads;
export const selectMessages = (state) => state.chat.messages;
export const selectActiveConversationId = (state) =>
  state.chat.activeConversationId;
// export const selectChatLoading = (state) => state.chat.loading;
// export const selectChatError = (state) => state.chat.error;
export const selectCurrentUser = (state) => state.chat.currentUser;
// export const selectOtherUsers = (state) => state.chat.otherUsers;

export const selectOtherUsers = (state) => state.chat.otherUsers;

export const selectActiveThread = createSelector(
  [selectThreads, selectActiveConversationId],
  (threads, activeId) => {
    if (!activeId) return null;
    return threads.find((thread) => thread.id === activeId) || null;
  },
);

export const selectActiveMessages = createSelector(
  [selectMessages, selectActiveConversationId],
  (messages, activeId) => {
    if (!activeId) return [];
    return messages[activeId] || [];
  },
);

// export const selectTotalUnreadCount = createSelector(
//   [selectThreads],
//   (threads) =>
//     threads.reduce((total, thread) => {
//       return total + (thread.unreadCount || 0);
//     }, 0),
// );

// export const selectSortedThreads = createSelector([selectThreads], (threads) =>
//   [...threads].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)),
// );
