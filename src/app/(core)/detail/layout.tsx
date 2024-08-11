import React from "react";
import {cn} from "@/lib/utils";

export default function DetailLayout({
                                       children,
                                     }: {
  children: React.ReactNode
}) {
  return (
      <>
        <section
            className={cn(`p-6`)}
        >
          {children}
        </section>
      </>
  )
}