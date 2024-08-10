import type {Metadata} from "next";
import "@/app/globals.css";
import React from "react";
import {cn} from "@/lib/utils";
import {poppins} from "@/app/fonts";
import {Toaster} from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "KakiLima",
  description: "A place to find your favorite KakiLima store",
};

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={cn(poppins.className)}>
      {children}
      <Toaster />
      </body>
      </html>
  );
}
