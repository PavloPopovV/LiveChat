import { useState } from "react";
import { toast } from "react-hot-toast";
import useConversation from "../store/useConversation";

export default function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/messages/send/${selectedConversation._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ message }),
        });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages([...messages, data.newMessage]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
}
