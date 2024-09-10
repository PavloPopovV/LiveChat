import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constantes/routes";
import App from "./App";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <ProtectedRoute navigateTo={ROUTES.LOGIN}>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <PublicRoute navigateTo={ROUTES.HOME}>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: ROUTES.SIGNUP,
        element: (
          <PublicRoute navigateTo={ROUTES.HOME}>
            <SignUp />
          </PublicRoute>
        ),
      },
    ],
  },
]);
