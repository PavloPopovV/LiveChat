import React, { useEffect, useRef } from "react";
import Message from "../Message";
import useGetMessages from "../../../hooks/useGetMessages";
import MessageSkeleton from "../../skeletons/MessagesSkeleton";
import useListenMessages from "../../../hooks/useListenMessages";


export default function Messages() {
  useListenMessages()
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef();

  console.log(messages)

  useEffect(() => {
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    },100)
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length > 0 && (
        <ul>
          {messages.map(message => (
            <li key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </li>
          ))}
        </ul>
      )}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center ">Send message to start conversation</p>
      )}
    </div>
  );
}
