"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface SignUpFormProps {
  onBack: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const displayName = formData.get("displayName") as string;

    if (password !== confirmPassword) {
      setError(t("password_mismatch"));
      return;
    }
    setError(null);
    console.log("Sign Up:", { email, password, displayName });
  };

  return (
    <div className="flex flex-col p-4 text-white max-w-md mx-auto sm:p-6">
      <h2 className="text-xl mb-4 fade-in">{t("sign_up")}</h2>
      {error && <p className="text-red-500 mb-4 fade-in">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-2 bg-gray-800 rounded text-white border-none focus:ring-2 focus:ring-brand-accent hover:bg-gray-700 transition-colors"
            aria-label="Email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength={8}
            className="w-full p-2 bg-gray-800 rounded text-white border-none focus:ring-2 focus:ring-brand-accent hover:bg-gray-700 transition-colors"
            aria-label="Password"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            minLength={8}
            className="w-full p-2 bg-gray-800 rounded text-white border-none focus:ring-2 focus:ring-brand-accent hover:bg-gray-700 transition-colors"
            aria-label="Confirm Password"
          />
        </div>
        <div>
          <label htmlFor="displayName" className="block mb-1">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            required
            className="w-full p-2 bg-gray-800 rounded text-white border-none focus:ring-2 focus:ring-brand-accent hover:bg-gray-700 transition-colors"
            aria-label="Display Name"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-brand-accent text-white rounded hover:bg-blue-700 transition-colors"
            aria-label="Submit Sign Up"
          >
            {t("sign_up")}
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

export default SignUpForm;