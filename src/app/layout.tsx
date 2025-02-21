import type { Metadata } from "next";
import "./globals.css";
import "../lib/i18n";

export const metadata: Metadata = {
  title: "BrandBlitz",
  description: "A conversational design studio powered by Blaze",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}