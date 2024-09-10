import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { ROUTES } from "../../constantes/routes";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children, navigateTo }) {
  const { authUser } = useAuthContext();

  if (authUser) return <Navigate to={navigateTo} replace />;
  return children;
}
