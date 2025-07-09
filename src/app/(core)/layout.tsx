import React from "react";
import {Navbar, CategoryMenu} from "@/components/layout/navbar/navbar"; // Added CategoryMenu
import {Footer} from "@/components/layout/footer";

export default function DetailLayout(
    {
      children,
    }: {
      children: React.ReactNode
    }
) {
  return (
      <div className="min-h-screen bg-gray-50/50">
        <Navbar/>
        <CategoryMenu />
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
          {children}
        </main>
        <Footer/>
      </div>
  )
}