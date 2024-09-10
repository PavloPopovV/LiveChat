import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constantes/routes";

export default function useLogout() {
  const [ loading, setLoading ] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
}
