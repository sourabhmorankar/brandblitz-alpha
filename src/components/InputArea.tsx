"use client";

import React from "react";

interface InputAreaProps {
  sendMessageAction: (formData: FormData) => void;
  isPending: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ sendMessageAction, isPending }) => {
  return (
    <form
      action={sendMessageAction}
      className="flex p-4 border-t border-gray-700"
    >
      <input
        type="text"
        name="message"
        disabled={isPending}
        className="flex-1 p-2 rounded-l bg-gray-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-brand-accent"
        placeholder="Type your message..."
        aria-label="Type your message"
      />
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-brand-accent text-white rounded-r hover:bg-blue-700 disabled:opacity-50"
        aria-label="Send message"
      >
        {isPending ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default InputArea;