import { useRoutes } from "react-router-dom";

import FeedPage from "@/pages/feed/FeedPage";
import PostPage from "@/pages/post/PostPage";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import NotificationList from "@/pages/NotificationsList/NotificationsList";
import FavoriteList from "@/pages/FavoriteList/FavoriteList";
import PostUserList from "@/pages/postsOfUser/postUserList";
import {
  AuthPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerificationPage,
  OAuth2Callback,
} from "@/pages/auth";
import NotFoundPage from "@/pages/notFound/NotFoundPage";
import UnauthorizedPage from "@/pages/unauthorized/UnauthorizedPage";
import ChatPage from "@/pages/chat/ChatPage";
import FollowPage from "@/pages/follow/FollowPage";

const RootRouter = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <FeedPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/follow",
    element: (
      <PrivateRoute>
        <FollowPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/users/:id",
    element: (
      <PrivateRoute>
        <h1>User Profile Page</h1>
      </PrivateRoute>
    ),
  },
  {
    path: "/post/:postId",
    element: <PostPage />,
  },
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthPage />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <PublicRoute>
        <ForgotPasswordPage />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password/reset",
    element: (
      <PublicRoute>
        <ResetPasswordPage />
      </PublicRoute>
    ),
  },
  {
    path: "/verification",
    element: (
      <PublicRoute>
        <VerificationPage />
      </PublicRoute>
    ),
  },
  {
    path: "/oauth2/callback",
    element: (
      <PublicRoute>
        <OAuth2Callback />
      </PublicRoute>
    ),
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "/chat",
    element: (
      <PrivateRoute>
        <ChatPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/posts",
    element: (
      <PrivateRoute>
        <PostUserList />
      </PrivateRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <PrivateRoute>
        <NotificationList />
      </PrivateRoute>
    ),
  },
  //
  {
    path: "/favorite",
    element: (
      <PrivateRoute>
        <FavoriteList />
      </PrivateRoute>
    ),
  },
];

export const AppRouter = () => useRoutes(RootRouter);
