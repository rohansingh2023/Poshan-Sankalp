"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/globals.css";
import "@/styles/tailwind.css";
import { DataProvider } from "../../context/DataContext";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
           <SessionProvider>{children}</SessionProvider>
        </DataProvider> 
      </body>
    </html>
  );
}
