import { useRoutes } from "react-router-dom";
import FeedPage from "@/pages/feed/FeedPage";

const RootRouter = [
  {
    path: "/",
    element: <FeedPage />,
  },
  {
    path: "/users/:id",
    element: <h1>User Profile Page</h1>,
  },
];

export const AppRouter = () => useRoutes(RootRouter);
