"use client";

import React, { useState } from "react";
import { useActionState } from "react";
import { useTranslation } from "react-i18next";
import MessageList from "./MessageList";
import InputArea from "./InputArea";
import SignUpForm from "./SignUpForm";

type Message = {
  text: string;
  sender: "user" | "blaze";
  buttons?: { text: string; action: string }[];
  timestamp: number;
};

const ChatContainer: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showSignUp, setShowSignUp] = useState(false);

  const [state, sendMessageAction, isPending] = useActionState(
    async (_prevState: Message[], formData: FormData) => {
      const text = formData.get("message") as string;
      if (!text.trim()) return messages;

      const userMessage: Message = {
        text,
        sender: "user",
        timestamp: Date.now(),
      };
      const updatedMessages = [...messages, userMessage];

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const blazeMessage: Message = {
        text: t("welcome"),
        sender: "blaze",
        buttons: [
          { text: t("sign_up"), action: "sign_up" },
          { text: t("learn_more"), action: "learn_more" },
          { text: t("schedule_call"), action: "schedule_call" },
          { text: t("view_portfolio"), action: "view_portfolio" },
        ],
        timestamp: Date.now(),
      };
      return [...updatedMessages, blazeMessage];
    },
    messages
  );

  React.useEffect(() => {
    setMessages(state);
  }, [state]);

  const handleAction = (action: string) => {
    if (action === "sign_up") {
      setShowSignUp(true);
    } else {
      const response: Message = {
        text: `You clicked ${action}. This feature is coming soon!`,
        sender: "blaze",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, response]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-brand-dark">
      {showSignUp ? (
        <SignUpForm onBack={() => setShowSignUp(false)} />
      ) : (
        <>
          <MessageList messages={messages} handleAction={handleAction} />
          <InputArea sendMessageAction={sendMessageAction} isPending={isPending} />
        </>
      )}
    </div>
  );
};

export default ChatContainer;