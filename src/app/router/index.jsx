import { useRoutes } from "react-router-dom";

import FeedPage from "@/pages/feed/FeedPage";
import PostPage from "@/pages/post/PostPage";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import NotificationList from "@/pages/NotificationsList/NotificationsList";
import FavoriteList from "@/pages/FavoriteList/FavoriteList";
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
    path: "/users/:id/chat",
    element: <h1>Messenger</h1>,
  },
  {
    path: "/users/:id/posts",
    element: <FeedPage/>,
  },
  {
    path: "/users/:id/profile",
    element: <h1>Profile</h1>,
  },
  {
    path: "/users/:id/logout",
    element: <h1>LogOut</h1>,
  },
  {
    path: "/users/:id/search",
    element: <h1>Search</h1>,
  },
  {
    path: "/users/:id/notifications",
    element:<NotificationList/>,
  },
  //
  {
    path: "/users/:id/favorite",
    element: <FavoriteList/>,
  },
];

export const AppRouter = () => useRoutes(RootRouter);
