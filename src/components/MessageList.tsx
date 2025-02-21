import React from "react";
import Message from "./Message";
import { useTranslation } from "react-i18next";
import { FaRobot } from "react-icons/fa";

type Message = {
  text: string;
  sender: "user" | "blaze";
  buttons?: { text: string; action: string }[];
  timestamp: number;
};

interface MessageListProps {
  messages: Message[];
  handleAction: (action: string) => void;
  isPending: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, handleAction, isPending }) => {
  const { t } = useTranslation();
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, idx) => (
        <Message key={idx} {...msg} handleAction={handleAction} />
      ))}
      {isPending && (
        <div className="flex items-center gap-2 p-2 text-gray-400">
          <FaRobot className="text-blue-400" />
          <span>{t("loading")}</span>
          <span className="animate-pulse">...</span>
        </div>
      )}
    </div>
  );
};

export default MessageList;