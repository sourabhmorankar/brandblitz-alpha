"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface PortfolioCarouselProps {
  onBack: () => void;
}

const PortfolioCarousel: React.FC<PortfolioCarouselProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const samples = [
    { id: 1, title: "Sample Logo", description: t("portfolio_logo"), color: "bg-red-500" },
    { id: 2, title: "Sample Banner", description: t("portfolio_banner"), color: "bg-blue-500" },
    { id: 3, title: "Sample Website", description: t("portfolio_website"), color: "bg-green-500" },
  ];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % samples.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + samples.length) % samples.length);

  return (
    <div className="flex flex-col p-4 text-white max-w-md mx-auto">
      <h2 className="text-xl mb-4">{t("view_portfolio")}</h2>
      <div className="relative w-full h-64 mb-4">
        <div
          className={`w-full h-full ${samples[currentIndex].color} rounded flex items-center justify-center`}
        >
          <div className="text-center">
            <h3 className="text-lg">{samples[currentIndex].title}</h3>
            <p>{samples[currentIndex].description}</p>
          </div>
        </div>
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full"
          aria-label="Previous Sample"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full"
          aria-label="Next Sample"
        >
          →
        </button>
      </div>
      <button
        onClick={onBack}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        aria-label="Back to Chat"
      >
        {t("back")}
      </button>
    </div>
  );
};

export default PortfolioCarousel;