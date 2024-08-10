import {CategoryMenu} from "@/components/layout/navbar";
import React from "react";

export default async function DetailLayout(
    {
      children,
    }: {
      children: React.ReactNode
    }
) {
  return (
      <>
        <CategoryMenu/>
        <section className={`p-6`}>
          {children}
        </section>
      </>
  )
}