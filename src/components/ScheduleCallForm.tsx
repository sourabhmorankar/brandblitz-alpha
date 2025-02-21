"use client";

import React from "react";
import { useTranslation } from "react-i18next";

interface ScheduleCallFormProps {
  onBack: () => void;
}

const ScheduleCallForm: React.FC<ScheduleCallFormProps> = ({ onBack }) => {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const slot = formData.get("slot") as string;
    console.log("Scheduled call:", slot);
  };

  return (
    <div className="flex flex-col p-4 text-white max-w-md mx-auto sm:p-6">
      <h2 className="text-xl mb-4 fade-in">{t("schedule_call")}</h2>
      <p className="mb-4 fade-in">{t("schedule_call_info")}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="slot" className="block mb-1">
            {t("select_time")}
          </label>
          <select
            id="slot"
            name="slot"
            required
            className="w-full p-2 bg-gray-800 rounded text-white border-none focus:ring-2 focus:ring-brand-accent hover:bg-gray-700 transition-colors"
            aria-label="Select a time slot"
          >
            <option value="">{t("choose_slot")}</option>
            <option value="tomorrow-10am">Tomorrow, 10 AM</option>
            <option value="tomorrow-2pm">Tomorrow, 2 PM</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-brand-accent text-white rounded hover:bg-blue-700 transition-colors"
            aria-label="Schedule Call"
          >
            {t("schedule")}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            aria-label="Back to Chat"
          >
            {t("back")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleCallForm;