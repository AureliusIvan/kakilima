"use client";

import {useForm} from "react-hook-form";
import {account} from "@/utils/appwrite/appwrite.config";
import {useToast} from "@/components/ui/use-toast";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {useRouter} from "next/navigation";

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordFormValues>();
  const {toast} = useToast();
  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await account.createRecovery(data.email, `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`);
      toast({
        title: "Password Reset Requested",
        description: "If an account with that email exists, a password reset link has been sent.",
      });
      // Optionally redirect or clear form
      // router.push("/login");
    } catch (error: any) {
      console.error("Forgot Password Error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send password reset email. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full space-y-6"
        >
          <h1 className="text-2xl font-bold mb-4">Forgot Your Password?</h1>
          <p className="text-gray-600 mb-6">
            No worries! Enter your email address below and we&#39;ll send you a link to reset your password.
          </p>

          <div>
            <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", {required: "Email is required"})}
                className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
                <p className="text-red-500 text-xs mt-1 text-left">{errors.email.message?.toString()}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>

          <div className="mt-4 text-sm">
            <Link href="/login" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
  );
};

export default ForgotPasswordPage;
