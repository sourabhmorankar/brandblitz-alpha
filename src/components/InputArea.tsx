"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface InputAreaProps {
  sendMessageAction: (formData: FormData) => void;
  isPending: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ sendMessageAction, isPending }) => {
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSubmit = async (formData: FormData) => {
    const text = formData.get("message") as string;
    if (!text.trim()) {
      setError(t("input_empty_error"));
      return;
    }
    setError(null);
    try {
      await sendMessageAction(formData);
    } catch {
      setError(t("send_message_error"));
    }
  };

  return (
    <form action={handleSubmit} className="p-4 border-t border-gray-700">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex">
        <input
          type="text"
          name="message"
          disabled={isPending}
          className="flex-1 p-2 rounded-l bg-gray-900 text-white border-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-800 transition-colors sm:p-3"
          placeholder={t("input_placeholder")}
          aria-label={t("input_aria_label")}
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 disabled:opacity-50 transition-colors sm:px-6"
          aria-label={t("send_button_aria_label")}
        >
          {isPending ? t("sending") : t("send")}
        </button>
      </div>
    </form>
  );
};

export default InputArea;