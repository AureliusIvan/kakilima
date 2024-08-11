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
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png"/>
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
              side={'bottom'}
              align={'end'}
              alignOffset={-10}
          >
            <DropdownMenuLabel>
              {userInfo?.name || 'Guest'}
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            {userInfo ? authMenu.map((item, index) => (
                <Link key={index} href={item.route}>
                  <DropdownMenuItem
                      className={cn(item.type === 'destructive' && 'bg-red-500 text-white')}
                  >
                    {item.name}
                  </DropdownMenuItem>
                </Link>
            )) : guestMenu.map((item, index) => (
                <Link key={index} href={item.route}>
                  <DropdownMenuItem>
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

          <DialogTrigger>
            <Input
                type={'search'}
                placeholder={'Search'}
                className={cn(`w-full`)}
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                What are you looking for?
              </DialogTitle>
              <DialogDescription>
                Find a KakiLima store nearby
              </DialogDescription>

              <Input
                  type={'search'}
                  placeholder={'Search'}
                  className={cn(`w-full`)}
                  onChange={handleSearch}
              />

              <div>
                {isSearching && <p>Searching...</p>}
                {searchResult.map((item, index) => (
                    <DialogClose
                        key={index}
                        asChild
                    >
                      <Link
                          className={cn(`p-2 hover:bg-gray-100 w-full`)}
                          href={`/detail/${item.$id}`}
                          key={index}
                      >

                        {item.name} - {item.location}
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