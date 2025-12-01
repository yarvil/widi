import { useRoutes } from "react-router-dom";

const RootRouter = [
  {
    path: "/",
    element: <h1>Home Page</h1>,
  },
  {
    path: "/users/:id",
    element: <h1>User Page</h1>,
  },
];

export const AppRouter = () => useRoutes(RootRouter);
