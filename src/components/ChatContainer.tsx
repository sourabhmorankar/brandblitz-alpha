"use client";

import React, { useState, useEffect, useRef } from "react";
import { useActionState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import MessageList from "./MessageList";
import InputArea from "./InputArea";
import PortfolioCarousel from "./PortfolioCarousel";
import FolderExplorer from "./FolderExplorer";
import QuickTour from "./QuickTour";
import ScheduleCallForm from "./ScheduleCallForm";
import SignUpForm from "./SignUpForm";

type Message = {
  text: string;
  sender: "user" | "blaze";
  buttons?: { text: string; action: string }[];
  timestamp: number;
};

type View = "chat" | "portfolio" | "folders" | "tour" | "schedule" | "sign_up";

const ChatContainer: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentView, setCurrentView] = useState<View>("chat");
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [actionProgress, setActionProgress] = useState<number>(0);
  const [displayName, setDisplayName] = useState<string>("Guest");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blazeMessage: Message = {
      text: t("initial_greeting"),
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
    setMessages([blazeMessage]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, sendMessageAction, isPending] = useActionState<Message[], FormData>(
    async (state: Message[], formData: FormData) => {
      const text = formData.get("message") as string;
      if (!text.trim()) return state;

      const userMessage: Message = {
        text,
        sender: "user",
        timestamp: Date.now(),
      };
      const updatedMessages = [...state, userMessage];

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
              if (text !== state[state.length - 2].text) {
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
    setMessages(state as Message[]);
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state]);

  const handleAction = (action: string) => {
    let responseText: string;
    try {
      switch (action) {
        case "sign_up":
          setCurrentView("sign_up");
          responseText = t("sign_up_email_prompt");
          break;
        case "learn_more":
          responseText = t("learn_more_response");
          break;
        case "schedule_call":
          setCurrentView("schedule");
          responseText = t("schedule_call_info") + " " + t("schedule_call_prompt");
          break;
        case "view_portfolio":
          setCurrentView("portfolio");
          responseText = t("portfolio_intro") + "\n- " + t("portfolio_logo") + "\n- " + t("portfolio_banner") + "\n- " + t("portfolio_website");
          break;
        case "quick_tour":
          setCurrentView("tour");
          responseText = t("tour_start") + "\n1. " + t("tour_step1") + "\n2. " + t("tour_step2") + "\n3. " + t("tour_step3");
          break;
        case "folders":
          setCurrentView("folders");
          responseText = t("folder_explorer_info");
          break;
        default:
          throw new Error(t("action_not_recognized"));
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : t("unexpected_error");
      responseText = errorMessage;
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

  const handleBack = () => setCurrentView("chat");

  return (
    <div className="chat-container">
      <AnimatePresence mode="wait">
        {currentView === "chat" && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 border-b border-gray-700 text-center text-white text-xl flex justify-between items-center">
              <span>{t("chat_header", { name: displayName })}</span>
            </div>
            <MessageList messages={messages} handleAction={handleAction} isPending={isPending} />
            <InputArea sendMessageAction={sendMessageAction} isPending={isPending} />
            <div ref={chatEndRef} />
          </motion.div>
        )}
        {currentView === "portfolio" && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <PortfolioCarousel onBack={handleBack} />
          </motion.div>
        )}
        {currentView === "folders" && (
          <motion.div
            key="folders"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <FolderExplorer onBack={handleBack} />
          </motion.div>
        )}
        {currentView === "tour" && (
          <motion.div
            key="tour"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <QuickTour onBack={handleBack} />
          </motion.div>
        )}
        {currentView === "schedule" && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ScheduleCallForm onBack={handleBack} />
          </motion.div>
        )}
        {currentView === "sign_up" && (
          <motion.div
            key="sign_up"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <SignUpForm onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatContainer;