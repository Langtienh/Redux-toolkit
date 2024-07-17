import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "@Redux/toolkit với Slice",
  description: "Tiến đang học @Reduxjs/Toolkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
