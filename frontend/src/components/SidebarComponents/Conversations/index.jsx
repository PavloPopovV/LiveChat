import React from "react";
import Conversation from "../Conversation";
import useGetConversations from "../../../hooks/useGetConversations";
import { getRandomEmoji } from "../../../utils/emoji";

export default function Conversations() {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
      <ul>
        {conversations.map(item => (
          <li key={item._id}>
            <Conversation data={item} emoji={getRandomEmoji()}/>
          </li>
        ))}
      </ul>
    </div>
  );
}
