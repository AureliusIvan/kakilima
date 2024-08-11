"use client";

import {account} from "@/utils/appwrite/appwrite.config";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {OAuthProvider} from "appwrite";
import {FaGithub, FaGoogle} from "react-icons/fa";
import {cn} from "@/lib/utils";
import {User} from "@/interface/user";
import {registerNewUser} from "@/app/(auth)/register/register.action";

const RegisterPage = () => {
  // TODO: can we use this to redirect to the previous page?
  // const params = useParams<{ tag: string; item: string }>()

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const result = await registerNewUser(data as User);
      console.log(result);
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
            Hello there!
          </h2>

          <p>
            Welcome to the community!
          </p>

          <Input
              type="text"
              placeholder="Name"
              {...register("name", {required: true})}
          />


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
            Already have an account? <Link href={"/login"}>Login</Link>
          </div>
        </section>

      </form>
  );
};

export default RegisterPage;
