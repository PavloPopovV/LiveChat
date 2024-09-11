import { createRoot } from "react-dom/client";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { router } from "./router.jsx";
import "./styles/main.css";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <SocketContextProvider>
      <RouterProvider router={router} />
    </SocketContextProvider>
  </AuthContextProvider>
);
