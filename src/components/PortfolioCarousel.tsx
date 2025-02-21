"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface PortfolioCarouselProps {
  onBack: () => void;
}

const PortfolioCarousel: React.FC<PortfolioCarouselProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    afterChange: () => setIsLoading(false),
  };

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

  return (
    <div className="flex flex-col p-4 text-white max-w-md mx-auto sm:p-6">
      <h2 className="text-xl mb-4 fade-in">{t("view_portfolio")}</h2>
      {isLoading && (
        <div className="w-full h-64 mb-4 skeleton" />
      )}
      <Slider {...settings}>
        {samples.map((sample) => (
          <div key={sample.id}>
            <img
              src={sample.image}
              alt={sample.title}
              className="w-full h-64 object-cover rounded fade-in"
            />
            <div className="mt-2">
              <h3 className="text-lg">{sample.title}</h3>
              <p>{sample.description}</p>
            </div>
          </div>
        ))}
      </Slider>
      <button
        onClick={onBack}
        className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
        aria-label="Back to Chat"
      >
        {t("back")}
      </button>
    </div>
  );
};

export default PortfolioCarousel;