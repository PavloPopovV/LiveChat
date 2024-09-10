import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ROUTES } from "../constantes/routes";
import toast from "react-hot-toast";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async (username, password) => {
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("chat-user", JSON.stringify(data.user));
        setAuthUser(data.user);
        navigate(ROUTES.HOME);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
}
