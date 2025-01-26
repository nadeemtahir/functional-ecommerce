"use client"; // Mark this component as a Client Component

import localFont from "next/font/local";
import "./globals.css";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { SearchProvider } from "./components/SearchContext";
import { ClerkProvider } from "@clerk/clerk-react";

// Load local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// RootLayout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!} // Access the environment variable
      routerPush={() => {}}
      routerReplace={() => {}}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Wrap children with Redux Provider */}
          <SearchProvider>
            <Provider store={store}>{children}</Provider>
          </SearchProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
