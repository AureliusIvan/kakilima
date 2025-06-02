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
            bg-primary p-4 sm:p-6
            shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
            `}
        >
          <Link
              className={'text-center font-bold flex items-center space-x-2 justify-center'}
              href={'/'}
          >
            <span className={cn(`text-3xl`)}>
              🥘
            </span>
            <span className={`text-xs sm:text-xl text-white text-left`}>
              Kaki
              <br/>
              Lima
            </span>

          </Link>

          <section className={`relative w-full flex justify-center items-center`}>
            <SearchBar/>
          </section>


          <section
              className={`flex space-x-4`}
          >
            <Link
                className={buttonVariants({variant: 'outline'})}
                href={'/add'}
            >
              Add Store
            </Link>

            <NavbarProfile/>
          </section>
        </section>
      </>
  )
}

async function CategoryMenu() {
  return (
      <ScrollArea
          className={'w-full whitespace-nowrap rounded-md border'}>
        <section className={cn(`flex w-full space-x-3 p-6 justify-center`)}>
          {RouteMapComponent(RouteList)}
        </section>
        <ScrollBar orientation="horizontal"/>
      </ScrollArea>
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
                        p-3 sm:p-4 min-w-[80px] sm:min-w-[90px]
                        transition duration-300 ease-in-out
                        bg-gray-200 hover:bg-gray-300
                        flex flex-col justify-center items-center
                        text-gray-700 hover:text-black font-bold rounded-lg
                        shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
                        text-center
                    `,
                    )
                  }
                  key={index} href={`/category/${route.route}`}
              >
                <span className="text-2xl sm:text-3xl"> {/* Icon size can be controlled if needed */}
                {route.icon ? route.icon : ''}
                </span>
                <span className="text-xs sm:text-sm mt-1"> {/* Adjusted text size and margin */}
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
