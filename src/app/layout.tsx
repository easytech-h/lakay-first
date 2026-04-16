import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "prolify",
  description: "prolify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
