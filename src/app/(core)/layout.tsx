import React from "react";
import {Navbar} from "@/components/layout/navbar/navbar";
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
        <section
            className={`min-h-screen`}
        >
          {children}
        </section>
        <Footer/>
      </>
  )
}