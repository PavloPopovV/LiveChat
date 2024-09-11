import React from "react";
import useConversation from "../../../store/useConversation";
import { useSocketContext } from "../../../context/SocketContext";

export default function Conversation({ data, emoji }) {
  const { selectedConversation, setSelectedConversation } =
    useConversation();

  const isSelected = selectedConversation?._id === data._id;
const {onlineUsers } = useSocketContext()
const isOnline = onlineUsers.includes(data._id)

  const { profilePic, fullName } = data;
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(data)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
    </>
  );
}
