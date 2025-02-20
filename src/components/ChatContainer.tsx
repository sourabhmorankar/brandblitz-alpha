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
  const [view, setView] = useState<"chat" | "sign_up" | "schedule_call" | "portfolio" | "tour">("chat");

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
          { text: t("quick_tour"), action: "quick_tour" },
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
      case "quick_tour":
        setView("tour");
        setMessages((prev) => [
          ...prev,
          {
            text: t("tour_start"),
            sender: "blaze",
            timestamp: Date.now(),
          },
        ]);
        break;
      default:
        console.log(`Unhandled action: ${action}`);
    }
  };

  const handleBack = () => setView("chat");

  return (
    <div className="flex flex-col h-screen bg-brand-dark">
      <div className={`flex-1 view-transition ${view === "chat" ? "opacity-100" : "opacity-0"}`}>
        {view === "chat" && (
          <>
            <MessageList messages={messages} handleAction={handleAction} />
            <InputArea sendMessageAction={sendMessageAction} isPending={isPending} />
          </>
        )}
      </div>
      {view === "sign_up" && <SignUpForm onBack={handleBack} />}
      {view === "schedule_call" && <ScheduleCallForm onBack={handleBack} />}
      {view === "portfolio" && <PortfolioCarousel onBack={handleBack} />}
      {view === "tour" && (
        <div className="p-4 text-white max-w-md mx-auto">
          <p className="mb-4">{t("tour_step1")}</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            aria-label="Back to Chat"
          >
            {t("back")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;