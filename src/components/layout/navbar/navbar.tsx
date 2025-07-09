"use server";

import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import {AiOutlineGlobal} from "react-icons/ai";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {account} from "@/utils/appwrite/appwrite.config";
import {NavbarProfile, SearchBar} from "@/components/layout/navbar/navbar.client";

export type Route = {
  name: string;
  route: string;
  icon?: React.ReactNode;
}

const RouteList: Route[] = [
  {
    name: 'All',
    route: '/',
    icon: `🤙`
  },
  {
    name: 'Meals',
    route: '/meals',
    icon: `🍚`
  },
  {
    name: 'Snack',
    route: '/snack',
    icon: `🍟`
  },
  {
    name: 'Beverages',
    route: '/beverages',
    icon: `🍹`
  },
  {
    name: 'Dessert',
    route: '/dessert',
    icon: `🍨`
  }
]

async function Navbar() {
  return (
      <>
        {/* top section */}
        <section
            className={`
            flex justify-between items-center
            gradient-primary p-4 sm:p-6
            shadow-elegant backdrop-blur-glass
            border-b border-white/20
            animate-fade-in
            `}
        >
          <Link
              className={'text-center font-bold flex items-center space-x-3 justify-center group focus-ring rounded-lg p-2'}
              href={'/'}
          >
            <span className={cn(`text-4xl transition-transform duration-300 group-hover:scale-110 animate-pulse-subtle`)}>
              🥘
            </span>
            <span className={`text-sm sm:text-2xl text-white text-left font-bold tracking-wide`}>
              <span className="block">Kaki</span>
              <span className="block">Lima</span>
            </span>
          </Link>

          <section className={`relative w-full max-w-2xl flex justify-center items-center mx-6`}>
            <div className="relative w-full">
              <SearchBar/>
            </div>
          </section>

          <section
              className={`flex space-x-3 items-center`}
          >
            <Link
                className={cn(
                  buttonVariants({variant: 'outline'}),
                  'btn-hover-lift bg-white/90 hover:bg-white text-primary border-white/30 hover:border-white font-semibold px-6 py-2 backdrop-blur-sm shadow-card'
                )}
                href={'/add'}
            >
              <span className="hidden sm:inline">Add Store</span>
              <span className="sm:hidden">+</span>
            </Link>

            <NavbarProfile/>
          </section>
        </section>
      </>
  )
}

async function CategoryMenu() {
  return (
      <section className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <ScrollArea className={'w-full whitespace-nowrap'}>
          <section className={cn(`flex w-full space-x-4 p-6 justify-center animate-slide-up`)}>
            {RouteMapComponent(RouteList)}
          </section>
          <ScrollBar orientation="horizontal" className="hidden"/>
        </ScrollArea>
      </section>
  )
}


function RouteMapComponent(route: Route[]) {
  return (
      <>
        {route.map((route, index) => {
          return (
              <Link
                  className={
                    cn(
                        `
                        p-4 sm:p-6 min-w-[90px] sm:min-w-[120px]
                        transition-all duration-300 ease-in-out
                        bg-white hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary/20
                        border border-gray-200/50 hover:border-primary/30
                        flex flex-col justify-center items-center
                        text-gray-700 hover:text-primary font-semibold rounded-2xl
                        shadow-card hover:shadow-card-hover
                        transform hover:-translate-y-1 hover:scale-105
                        text-center group focus-ring
                        animate-scale-in
                        backdrop-blur-sm
                    `,
                    )
                  }
                  key={index} 
                  href={`/category/${route.route}`}
                  style={{animationDelay: `${index * 0.1}s`}}
              >
                <span className="text-3xl sm:text-4xl mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse-subtle">
                  {route.icon ? route.icon : ''}
                </span>
                <span className="text-xs sm:text-sm font-medium group-hover:font-semibold transition-all duration-300">
                  {route.name}
                </span>
              </Link>
          )
        })}
      </>
  )
}

export {
  Navbar,
  CategoryMenu
};
