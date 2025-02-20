import React from "react";

interface MessageProps {
  text: string;
  sender: "user" | "blaze";
  buttons?: { text: string; action: string }[];
  timestamp: number;
  handleAction: (action: string) => void;
}

const Message: React.FC<MessageProps> = ({
  text,
  sender,
  buttons,
  timestamp,
  handleAction,
}) => (
  <div
    className={`mb-4 p-2 rounded-lg max-w-xs fade-in ${
      sender === "user"
        ? "bg-brand-accent self-end text-white ml-auto"
        : "bg-gray-700 text-white mr-auto"
    }`}
  >
    <p>{text}</p>
    {buttons && (
      <div className="mt-2 flex flex-wrap gap-2">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handleAction(btn.action)}
            className="px-2 py-1 bg-brand-accent text-white rounded hover:bg-blue-700"
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
);

export default Message;