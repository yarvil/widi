import { useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../store/authentication/Loader";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const FeedPage = lazy(() => import("@/pages/feed/FeedPage"));
const PostPage = lazy(() => import("@/pages/post/PostPage"));
const NotificationList = lazy(
  () => import("@/pages/Notifications/NotificationsList"),
);
const FavoriteList = lazy(() => import("@/pages/FavoriteList/FavoriteList"));

const AuthPage = lazy(() => import("@/pages/auth/authPage/AuthPage"));
const LoginPage = lazy(() => import("@/pages/auth/loginPage/LoginPage"));
const RegisterPage = lazy(
  () => import("@/pages/auth/RegisterPage/RegisterPage"),
);
const ForgotPasswordPage = lazy(
  () => import("@/pages/auth/forgotPasswordPage/ForgotPasswordPage"),
);
const ResetPasswordPage = lazy(
  () => import("@/pages/auth/resetPasswordPage/ResetPasswordPage"),
);
const VerificationPage = lazy(
  () => import("@/pages/auth/verificationPage/verificationPage"),
);
const OAuth2Callback = lazy(
  () => import("@/pages/auth/oAuth2Callback/OAuth2Callback"),
);

const NotFoundPage = lazy(() => import("@/pages/notFound/NotFoundPage"));
const UnauthorizedPage = lazy(
  () => import("@/pages/unauthorized/UnauthorizedPage"),
);
const ChatPage = lazy(() => import("@/pages/chat/ChatPage"));
const FollowPage = lazy(() => import("@/pages/follow/FollowPage"));

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
    path: "/notifications",
    element: (
      <PrivateRoute>
        <NotificationList />
      </PrivateRoute>
    ),
  },
  {
    path: "/favorite",
    element: (
      <PrivateRoute>
        <FavoriteList />
      </PrivateRoute>
    ),
  },
];

export const AppRouter = () => {
  return <Suspense fallback={<Loader />}>{useRoutes(RootRouter)}</Suspense>;
};
