import React from "react";
import { FaRobot } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface MessageProps {
  text: string;
  sender: "user" | "blaze";
  buttons?: { text: string; action: string }[];
  timestamp: number;
  handleAction: (action: string) => void;
}

const Message: React.FC<MessageProps> = React.memo(
  function MessageComponent({ text, sender, buttons, timestamp, handleAction }) {
    const { t } = useTranslation();
    return (
      <div
        className={`mb-4 p-3 rounded-lg max-w-xs flex items-start gap-2 fade-in ${
          sender === "user"
            ? "bg-blue-600 self-end text-white ml-auto rounded-bl-none"
            : "bg-gray-700 text-white mr-auto rounded-br-none"
        }`}
        role="region"
        aria-label={sender === "user" ? t("user_message") : t("blaze_message")}
      >
        {sender === "blaze" && <FaRobot className="text-blue-400 mt-1" aria-hidden="true" />}
        <div>
          <p className="whitespace-pre-wrap">{text}</p>
          {buttons && (
            <div className="mt-2 flex flex-wrap gap-2">
              {buttons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAction(btn.action)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  aria-label={btn.text}
                >
                  {btn.text}
                </button>
              ))}
            </div>
          )}
          <span className="text-xs text-gray-400 block mt-1">
            {new Date(timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.text === nextProps.text &&
      prevProps.sender === nextProps.sender &&
      prevProps.timestamp === nextProps.timestamp &&
      prevProps.buttons?.length === nextProps.buttons?.length &&
      prevProps.handleAction === nextProps.handleAction
    );
  }
);

export default Message;