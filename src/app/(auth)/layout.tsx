import React from "react";

export default function AuthLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <section
          className={'min-h-screen'}
      >
        {children}
      </section>)
}