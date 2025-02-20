"use client";

import React, { useState } from "react";
import { useActionState } from "react";
import { useTranslation } from "react-i18next";
import MessageList from "./MessageList";
import InputArea from "./InputArea";
import SignUpForm from "./SignUpForm";
import ScheduleCallForm from "./ScheduleCallForm";
import PortfolioCarousel from "./PortfolioCarousel";

type Message = {
  text: string;
  sender: "user" | "blaze";
  buttons?: { text: string; action: string }[];
  timestamp: number;
};

const ChatContainer: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [view, setView] = useState<"chat" | "sign_up" | "schedule_call" | "portfolio">("chat");

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
    switch (action) {
      case "sign_up":
        setView("sign_up");
        break;
      case "learn_more":
        setMessages((prev) => [
          ...prev,
          {
            text: t("learn_more_response"),
            sender: "blaze",
            timestamp: Date.now(),
          },
        ]);
        break;
      case "schedule_call":
        setView("schedule_call");
        break;
      case "view_portfolio":
        setView("portfolio");
        break;
      default:
        console.log(`Unhandled action: ${action}`);
    }
  };

  const handleBack = () => setView("chat");

  return (
    <div className="flex flex-col h-screen bg-brand-dark">
      {view === "chat" ? (
        <>
          <MessageList messages={messages} handleAction={handleAction} />
          <InputArea sendMessageAction={sendMessageAction} isPending={isPending} />
        </>
      ) : view === "sign_up" ? (
        <SignUpForm onBack={handleBack} />
      ) : view === "schedule_call" ? (
        <ScheduleCallForm onBack={handleBack} />
      ) : (
        <PortfolioCarousel onBack={handleBack} />
      )}
    </div>
  );
};

export default ChatContainer;