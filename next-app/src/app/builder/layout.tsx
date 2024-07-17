import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "@Redux/toolkit với Builder",
  description: "Tiến đang học @Reduxjs/Toolkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
