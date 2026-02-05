import { useRoutes } from "react-router-dom";

import FeedPage from "@/pages/feed/FeedPage";
import PostPage from "@/pages/post/PostPage";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
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
import ChatPage from "@/pages/chat/ChatPage";

const RootRouter = [
  {
    path: "/",
    element: <FeedPage />,
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
    path: "/post/:postId",
    element: <PostPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
];

export const AppRouter = () => useRoutes(RootRouter);
