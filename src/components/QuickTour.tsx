"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaComments, FaPen, FaFolder } from "react-icons/fa";

interface QuickTourProps {
  onBack: () => void;
}

const QuickTour: React.FC<QuickTourProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const steps = [
    {
      text: t("tour_step1"),
      highlight: "Chat with Blaze to start designing!",
      icon: <FaComments className="text-brand-accent text-2xl" />,
    },
    {
      text: t("tour_step2"),
      highlight: "Submit a design request in seconds.",
      icon: <FaPen className="text-brand-accent text-2xl" />,
    },
    {
      text: t("tour_step3"),
      highlight: "Explore your portfolio and assets.",
      icon: <FaFolder className="text-brand-accent text-2xl" />,
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onBack();
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="flex flex-col p-4 text-white max-w-md mx-auto sm:p-6">
      <h2 className="text-xl mb-4 fade-in">{t("quick_tour")}</h2>
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          {steps[step].icon}
          <p>{steps[step].text}</p>
        </div>
        <p className="text-brand-accent">{steps[step].highlight}</p>
      </motion.div>
      <div className="flex justify-center gap-2 my-4">
        {steps.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === step ? "bg-brand-accent" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
      <div className="flex gap-4 justify-between">
        {step > 0 && (
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            aria-label="Previous Step"
          >
            {t("prev")}
          </button>
        )}
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-brand-accent text-white rounded hover:bg-blue-700 transition-colors"
          aria-label={step === steps.length - 1 ? "Finish Tour" : "Next Step"}
        >
          {step === steps.length - 1 ? t("finish") : t("next")}
        </button>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          aria-label="Back to Chat"
        >
          {t("back")}
        </button>
      </div>
    </div>
  );
};

export default QuickTour;