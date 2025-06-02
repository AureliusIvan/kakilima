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
      <>
        <Navbar/>
        <CategoryMenu />
        <main
            className={`min-h-screen px-4 py-6 sm:px-6 lg:px-8`}
        >
          {children}
        </main>
        <Footer/>
      </>
  )
}