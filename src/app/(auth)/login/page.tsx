"use client";

import {account} from "@/utils/appwrite/appwrite.config";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {OAuthProvider} from "appwrite";
import {useParams} from 'next/navigation'
import {FaGithub, FaGoogle} from "react-icons/fa";
import {cn} from "@/lib/utils";

interface User {
  name?: string;

  [key: string]: any;
}

const LoginPage = () => {
  // TODO: can we use this to redirect to the previous page?
  // const params = useParams<{ tag: string; item: string }>()

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data: User) => {
    console.log(data);
    try {
      account.createOAuth2Session(
          OAuthProvider.Github,
          `${process.env.NEXT_PUBLIC_APP_URL}/`,
          `${process.env.NEXT_PUBLIC_APP_URL}/`,
          ['repo', 'user']
      )
      console.log("Logged in");
    } catch (error) {
      console.error(error);
    }
  }

  const handleGithubLogin = async () => {
    try {
      account.createOAuth2Session(
          OAuthProvider.Github,
          `${process.env.NEXT_PUBLIC_APP_URL}/`,
          `${process.env.NEXT_PUBLIC_APP_URL}/login`,
          ['repo', 'user']
      )
      console.log("Logged in");
    } catch (error) {
      console.error(error);
    }
  }

  const handleGoogleLogin = async () => {
    try {
      account.createOAuth2Session(
          OAuthProvider.Google,
          `${process.env.NEXT_PUBLIC_APP_URL}/`,
          `${process.env.NEXT_PUBLIC_APP_URL}/login`,
          ['profile', 'email']
      )
      console.log("Logged in");
    } catch (error) {
      console.error(error);
    }
  }


  return (
      <form
          onSubmit={handleSubmit(onSubmit)}
          className={`
          bg-primary-dark
          flex flex-col items-center justify-center h-screen
          `}
      >

        <section
            className={`
            flex flex-col gap-4 p-4 bg-gray-100 rounded-lg
            shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
            `}
        >
          <h2
              className={`text-2xl font-bold`}
          >
            Welcome! 🥘
          </h2>

          <p>
            Let&#39;s get you logged in.
          </p>

          <Input
              type="email"
              placeholder="Email"
              {...register("email", {required: true})}
          />

          <Input
              type="password"
              placeholder="Password"
              {...register("password", {required: true})}
          />


          <Button
              type="submit"
          >
            Login
          </Button>

          <Button
              onClick={handleGoogleLogin}
              variant={'outline'}
              type={'button'}
              className={cn(`flex items-center gap-2`)}
          >
            Continue with Google <FaGoogle/>
          </Button>

          <Button
              variant={'outline'}
              onClick={handleGithubLogin}
              type={'button'}
              className={cn(`flex items-center gap-2`)}
          >
            Continue with Github <FaGithub/>
          </Button>

          <div
              className={"flex flex-row gap-2"}
          >
            First time here? <Link href={"/register"}>Register</Link>
          </div>
        </section>

      </form>
  );
};

export default LoginPage;
