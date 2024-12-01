import { App } from "app/App";
import { Main } from "app/Main";
import { Page404 } from "common/components";
import { Login } from "features/auth/ui/Login/Login";
import { createBrowserRouter } from "react-router-dom";

export const Path = {
  Login: "login",
  Main: "/",
} as const;

export const router = createBrowserRouter([
  {
    path: Path.Main,
    element: <App />,
    // errorElement: <Page404 />,
    children: [
      {
        path: Path.Main,
        element: <Main />,
      },
      {
        path: Path.Login,
        element: <Login />,
      },
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
]);
