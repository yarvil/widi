export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserEmail = (state) => state.auth.userEmail;
export const selectRemember = (state) => state.auth.remember;
export const selectStatusMessage = (state) => state.auth.statusMessage;
export const selectMessageType = (state) => state.auth.messageType;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
