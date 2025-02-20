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
    {
      id: 1,
      title: "Modern Logo",
      description: t("portfolio_logo"),
      image: "https://via.placeholder.com/300x200.png?text=Modern+Logo",
    },
    {
      id: 2,
      title: "Vibrant Banner",
      description: t("portfolio_banner"),
      image: "https://via.placeholder.com/300x200.png?text=Vibrant+Banner",
    },
    {
      id: 3,
      title: "Sleek Website",
      description: t("portfolio_website"),
      image: "https://via.placeholder.com/300x200.png?text=Sleek+Website",
    },
  ];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % samples.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + samples.length) % samples.length);

  return (
    <div className="flex flex-col p-4 text-white max-w-md mx-auto">
      <h2 className="text-xl mb-4">{t("view_portfolio")}</h2>
      <div className="relative w-full h-64 mb-4">
        <div className="w-full h-full rounded overflow-hidden">
          <img
            src={samples[currentIndex].image}
            alt={samples[currentIndex].title}
            className="w-full h-full object-cover fade-in"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
            <h3 className="text-lg">{samples[currentIndex].title}</h3>
            <p>{samples[currentIndex].description}</p>
          </div>
        </div>
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full hover:bg-gray-600"
          aria-label="Previous Sample"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full hover:bg-gray-600"
          aria-label="Next Sample"
        >
          →
        </button>
      </div>
      <div className="flex justify-center gap-2 mb-4">
        {samples.map((sample, idx) => (
          <button
            key={sample.id}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-brand-accent" : "bg-gray-500"
            }`}
            aria-label={`Go to sample ${idx + 1}`}
          />
        ))}
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