import {CategoryMenu} from "@/components/layout/navbar/navbar";
import React from "react";
import Image from "next/image";

export default async function DetailLayout(
    {
      children,
    }: {
      children: React.ReactNode
    }
) {
  return (
      <>
        <Image
            className={`w-full h-[400px] object-cover object-center`}
            src={'/images/home-banner.webp'}
            width={1920}
            height={1080}
            alt={'KakiLima'}

        />
        <CategoryMenu/>
        <section className={`p-6`}>
          {children}
        </section>
      </>
  )
}