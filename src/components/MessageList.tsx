import React from "react";
import Message from "./Message";

type Message = {
  text: string;
  sender: "user" | "blaze";
  buttons?: { text: string; action: string }[];
  timestamp: number;
};

interface MessageListProps {
  messages: Message[];
  handleAction: (action: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, handleAction }) => (
  <div className="flex-1 overflow-y-auto p-4">
    {messages.map((msg, idx) => (
      <Message key={idx} {...msg} handleAction={handleAction} />
    ))}
  </div>
);

export default MessageList;