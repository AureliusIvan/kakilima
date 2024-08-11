"use client";

import {Button} from "@/components/ui/button";
import {useEffect} from "react";
import {account} from "@/utils/appwrite/appwrite.config";
import {useRouter} from "next/navigation";

export default function LogoutPage() {
  const router = useRouter()
  useEffect(() => {
    async function handleLogout() {
      await account.deleteSession('current')
      router.push('/')
    }

    handleLogout()
  }, [])
  return (
      <section>
        <h1>Logout</h1>
      </section>
  )
}