"use client";

import React from "react";
import { useTranslation } from "react-i18next";

interface FolderExplorerProps {
  onBack: () => void;
}

const FolderExplorer: React.FC<FolderExplorerProps> = ({ onBack }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col p-4 text-white max-w-md mx-auto sm:p-6">
      <h2 className="text-xl mb-4 fade-in">{t("folder_explorer")}</h2>
      <p className="mb-4 fade-in">{t("folder_explorer_info")}</p>
      <div className="space-y-2">
        <div className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors">
          {t("folder_sample")}
        </div>
      </div>
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

export default FolderExplorer;