import { useRoutes } from "react-router-dom";

import FeedPage from "@/pages/feed/FeedPage";
import PostPage from "@/pages/post/PostPage";

const RootRouter = [
  {
    path: "/",
    element: <FeedPage />,
  },
  {
    path: "/users/:id",
    element: <h1>User Profile Page</h1>,
  },
  {
    path: "/:username/post/:postId",
    element: <PostPage />,
  },
];

export const AppRouter = () => useRoutes(RootRouter);
