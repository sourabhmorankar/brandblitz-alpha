"use client";

import React from "react";

interface InputAreaProps {
  sendMessageAction: (formData: FormData) => void;
  isPending: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ sendMessageAction, isPending }) => {
  return (
    <form action={sendMessageAction} className="p-4 border-t border-gray-700">
      <div className="flex">
        <input
          type="text"
          name="message"
          disabled={isPending}
          className="flex-1 p-2 rounded-l bg-gray-900 text-white border-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-800 transition-colors sm:p-3"
          placeholder="Ask me anything..."
          aria-label="Type your message"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 disabled:opacity-50 transition-colors sm:px-6"
          aria-label="Send message"
        >
          {isPending ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
};

export default InputArea;