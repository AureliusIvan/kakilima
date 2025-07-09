"use client";

import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React, {useEffect} from "react";
import {account} from "@/utils/appwrite/appwrite.config";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";
import {searchStoreByName} from "@/components/layout/navbar/navbar.action";
import {useDebounce} from "@uidotdev/usehooks";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {buttonVariants} from "@/components/ui/button";

interface UserInfo {
  name: string;
  email: string;
}

interface Route {
  name: string;
  route: string;
  type?: string;
}

const authMenu: Route[] = [
  {
    name: 'Add Store',
    route: '/add'
  },
  {
    name: 'Logout',
    route: '/logout',
    type: 'destructive'
  }
]

const guestMenu: Route[] = [
  {
    name: 'Login',
    route: '/login'
  },
  {
    name: 'Register',
    route: '/register'
  }
]

const NavbarProfile = () => {
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null)
  useEffect(() => {
    async function handleUser() {
      try {
        const isLogin = await account.get()
        console.log(isLogin)
        if (isLogin) {
          // @ts-ignore
          setUserInfo(isLogin)
        }
      } catch (AppwriteException) {
        console.error(AppwriteException)
      }
    }

    handleUser()
  }, [])
  return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-ring rounded-full">
            <Avatar className="h-10 w-10 ring-2 ring-white/30 hover:ring-white/50 transition-all duration-300 shadow-card hover:shadow-card-hover">
              <AvatarImage src="https://github.com/shadcn.png"/>
              <AvatarFallback className="bg-white/20 text-white font-bold">
                {userInfo?.name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
              side={'bottom'}
              align={'end'}
              alignOffset={-10}
              className="animate-scale-in shadow-elegant bg-white/95 backdrop-blur-md border-white/20"
          >
            <DropdownMenuLabel className="text-gray-800 font-semibold">
              {userInfo?.name || 'Guest'}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200"/>
            {userInfo ? authMenu.map((item, index) => (
                <Link key={index} href={item.route}>
                  <DropdownMenuItem
                      className={cn(
                        'transition-all duration-200 hover:bg-gray-50',
                        item.type === 'destructive' && 'text-red-600 hover:bg-red-50 hover:text-red-700'
                      )}
                  >
                    {item.name}
                  </DropdownMenuItem>
                </Link>
            )) : guestMenu.map((item, index) => (
                <Link key={index} href={item.route}>
                  <DropdownMenuItem className="transition-all duration-200 hover:bg-gray-50">
                    {item.name}
                  </DropdownMenuItem>
                </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
  )
}


const SearchBar = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<any[]>([])
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    async function handleSearch() {
      setIsSearching(true)
      try {
        if (!debouncedSearchTerm) {
          return
        }

        const data = await searchStoreByName(searchTerm)
        setSearchResult(data.documents)
        setIsSearching(false)
      } catch (error) {
        console.error(error)
      }
    }

    handleSearch()
  }, [debouncedSearchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const navigateTo = (route: string) => {
    router.push(`/detail/${route}`)
  }

  return (
      <>
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative w-full group">
              <Input
                  type={'search'}
                  placeholder={'Search for delicious food...'}
                  className={cn(`
                    w-full pl-12 pr-4 py-3 
                    bg-white/90 backdrop-blur-sm 
                    border-white/30 
                    rounded-2xl 
                    text-gray-700 
                    placeholder:text-gray-500
                    focus:bg-white focus:border-primary/50 
                    focus:ring-primary/20 focus:ring-4
                    transition-all duration-300
                    shadow-card hover:shadow-card-hover
                    focus-ring
                  `)}
                  readOnly
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-primary transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] animate-scale-in">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gradient">
                What are you looking for?
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Find a KakiLima store nearby and discover authentic Indonesian street food
              </DialogDescription>

              <div className="relative mt-4">
                <Input
                    type={'search'}
                    placeholder={'Search for your favorite food...'}
                    className={cn(`
                      w-full pl-12 pr-4 py-3 
                      border-gray-200 
                      rounded-xl 
                      focus:border-primary focus:ring-primary/20 focus:ring-4
                      transition-all duration-300
                      shadow-card
                    `)}
                    onChange={handleSearch}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="mt-4 max-h-64 overflow-y-auto">
                {isSearching && (
                  <div className="flex items-center justify-center p-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="ml-2 text-gray-500">Searching...</span>
                  </div>
                )}
                {searchResult.map((item, index) => (
                    <DialogClose
                        key={index}
                        asChild
                    >
                      <Link
                          className={cn(`
                            block p-4 hover:bg-gray-50 w-full rounded-lg
                            transition-all duration-200 border-b border-gray-100
                            hover:border-primary/20 group
                          `)}
                          href={`/detail/${item.$id}`}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                            {item.name}
                          </span>
                          <span className="text-sm text-gray-500 mt-1">
                            📍 {item.location}
                          </span>
                        </div>
                      </Link>
                    </DialogClose>
                ))}
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
  )
}


export {
  SearchBar,
  NavbarProfile
}