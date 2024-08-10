import React from "react";
import Link from "next/link";
import {IoMdArrowBack} from "react-icons/io";
import {buttonVariants} from "@/components/ui/button";

export default async function AddLayout(
    {
      children,
    }: {
      children: React.ReactNode
    }
) {
  return (
      <section
          className={`p-6`}
      >
        <header
            className={'flex gap-2 items-center mb-4'}
        >
          <Link
              className={buttonVariants({variant: 'outline'})}
              href={'/'}>
            <IoMdArrowBack/>
          </Link>

          <h1>
            Add new Kakilima store
          </h1>
        </header>

        <div
            className={`p-6`}
        >
          {children}
        </div>
      </section>
  )
}