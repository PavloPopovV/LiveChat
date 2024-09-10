import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";

export default function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();


  useEffect(() => {
    const getMessages = async () => {
        setLoading(true);
        try {
          const res = await fetch( `http://localhost:5000/api/messages/${selectedConversation._id}`, {
            method: "GET",
            headers: {"Content-Type": "application/json" },
            credentials: "include",
          })
          const data = await res.json();
          if (data.error) throw new Error(data.error);
          setMessages(data);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };
      if(selectedConversation?._id) getMessages()
  }, [selectedConversation?._id]);

  

  return { messages, loading };
}
