import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, navigateTo }) {
  const { authUser } = useAuthContext();

  if (authUser) return children;
  return <Navigate to={navigateTo} replace />;
}
