import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/navagation";
import { ReduxWrapper } from "@/redux/redux.wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "@Reduxjs/Toolkit",
  description: "Tiến đang học @Reduxjs/Toolkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxWrapper>
        <body className={inter.className}>
          <Nav />
          <main>{children}</main>
        </body>
      </ReduxWrapper>
    </html>
  );
}
