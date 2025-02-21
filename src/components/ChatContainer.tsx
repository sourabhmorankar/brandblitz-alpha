"use client";

import React, { useState, useRef, useEffect } from "react";
import { useActionState } from "react";
import { useTranslation } from "react-i18next";
import MessageList from "./MessageList";
import InputArea from "./InputArea";

type Message = {
  text: string;
  sender: "user" | "blaze";
  buttons?: { text: string; action: string }[];
  timestamp: number;
};

const ChatContainer: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [actionProgress, setActionProgress] = useState<number>(0);
  const [displayName, setDisplayName] = useState<string>("Guest");
  const chatEndRef = useRef<HTMLDivElement>(null);

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

      if (currentAction) {
        let responseText: string;
        switch (currentAction) {
          case "sign_up":
            if (actionProgress === 0) {
              if (!text.includes("@")) {
                responseText = t("sign_up_email_error");
              } else {
                setActionProgress(1);
                responseText = t("sign_up_password_prompt");
              }
            } else if (actionProgress === 1) {
              if (text.length < 8) {
                responseText = t("sign_up_password_error");
              } else {
                setActionProgress(2);
                responseText = t("sign_up_confirm_prompt");
              }
            } else if (actionProgress === 2) {
              if (text !== messages[messages.length - 2].text) {
                responseText = t("password_mismatch");
              } else {
                setActionProgress(3);
                responseText = t("sign_up_name_prompt");
              }
            } else {
              setDisplayName(text);
              setCurrentAction(null);
              setActionProgress(0);
              responseText = t("sign_up_complete", { name: text });
            }
            break;
          case "schedule_call":
            responseText = text.match(/tomorrow/i) && (text.includes("10") || text.includes("2"))
              ? t("schedule_call_confirm", { slot: text })
              : t("schedule_call_error");
            setCurrentAction(null);
            break;
          default:
            responseText = "Action not recognized.";
            setCurrentAction(null);
        }
        return [...updatedMessages, {
          text: responseText,
          sender: "blaze",
          timestamp: Date.now(),
        }];
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const blazeMessage: Message = {
        text: t("welcome", { name: displayName }),
        sender: "blaze",
        buttons: [
          { text: t("sign_up"), action: "sign_up" },
          { text: t("learn_more"), action: "learn_more" },
          { text: t("schedule_call"), action: "schedule_call" },
          { text: t("view_portfolio"), action: "view_portfolio" },
          { text: t("quick_tour"), action: "quick_tour" },
          { text: t("folder_explorer"), action: "folders" },
        ],
        timestamp: Date.now(),
      };
      return [...updatedMessages, blazeMessage];
    },
    messages
  );

  useEffect(() => {
    setMessages(state);
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state]);

  const handleAction = (action: string) => {
    let responseText: string;
    switch (action) {
      case "sign_up":
        setCurrentAction("sign_up");
        setActionProgress(0);
        responseText = t("sign_up_email_prompt");
        break;
      case "learn_more":
        responseText = t("learn_more_response");
        break;
      case "schedule_call":
        setCurrentAction("schedule_call");
        responseText = t("schedule_call_info") + " " + t("schedule_call_prompt");
        break;
      case "view_portfolio":
        responseText = t("portfolio_intro") + "\n- " + t("portfolio_logo") + "\n- " + t("portfolio_banner") + "\n- " + t("portfolio_website");
        break;
      case "quick_tour":
        responseText = t("tour_start") + "\n1. " + t("tour_step1") + "\n2. " + t("tour_step2") + "\n3. " + t("tour_step3");
        break;
      case "folders":
        responseText = t("folder_explorer_info");
        break;
      default:
        responseText = "Action not recognized.";
    }
    setMessages((prev) => [
      ...prev,
      {
        text: isPending ? t("loading") : responseText,
        sender: "blaze",
        timestamp: Date.now(),
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="p-4 border-b border-gray-700 text-center text-white text-2xl">
        BrandBlitz Chat
      </div>
      <MessageList messages={messages} handleAction={handleAction} />
      <InputArea sendMessageAction={sendMessageAction} isPending={isPending} />
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatContainer;