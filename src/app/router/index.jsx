import { useRoutes } from "react-router-dom";
import FeedPage from "@/pages/feed/FeedPage";
import ChatPage from "@/pages/chat/ChatPage";

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
    path: "/chat",
    element: <ChatPage />,
  },
];

export const AppRouter = () => useRoutes(RootRouter);
