"use server"

import React from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export default async function DetailLayout(
    {
      children,
    }: {
      children: React.ReactNode
    }
) {
  return (
      <>
        <section
            className={cn(`p-6 space-y-1.5 flex flex-col justify-center items-center`)}
        >
          {children}
        </section>
      </>
  )
}

// TODO: refactor back button to be a component