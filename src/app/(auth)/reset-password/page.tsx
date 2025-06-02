"use client";

// export const dynamic = 'force-dynamic'; // Keep if Suspense alone isn't enough, but Suspense is preferred.

import {useEffect, useState, Suspense} from "react"; // Added Suspense
import {useSearchParams, useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {account} from "@/utils/appwrite/appwrite.config";
import {useToast} from "@/components/ui/use-toast";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Link from "next/link";

interface ResetPasswordFormValues {
  newPassword_sdk_api_key: string;
  confirmPassword_sdk_api_key: string;
}

// New component that uses useSearchParams
const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {toast} = useToast();
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<ResetPasswordFormValues>();

  const [userId, setUserId] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const uId = searchParams.get("userId");
    const s = searchParams.get("secret");

    if (uId && s) {
      setUserId(uId);
      setSecret(s);
      setIsLoading(false);
    } else {
      setError("Invalid or missing password reset token. Please request a new one.");
      setIsLoading(false);
      // Removed toast from here as it might cause issues if called during initial render path for static export
    }
  }, [searchParams]); // Removed toast from dependencies

  const newPassword = watch("newPassword_sdk_api_key");

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!userId || !secret) {
      toast({ // Toast can be called here as it's a user interaction
        title: "Error",
        description: "Missing token information. Cannot reset password.",
        variant: "destructive",
      });
      return;
    }

    try {
      await account.updateRecovery(userId, secret, data.newPassword_sdk_api_key);
      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated. You can now log in.",
      });
      router.push("/login");
    } catch (err: any) {
      console.error("Reset Password Error:", err);
      toast({
        title: "Password Reset Failed",
        description: err.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
          <p className="mb-6">{error}</p>
          <Link href="/forgot-password">
            <Button variant="outline">Request New Link</Button>
          </Link>
        </div>
    );
  }

  return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full space-y-6"
        >
          <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
          <p className="text-gray-600 mb-6">
            Create a new password for your account. Make sure it&apos;s strong and memorable.
          </p>
          <div>
            <Input
                type="password"
                placeholder="New Password"
                {...register("newPassword_sdk_api_key", {
                  required: "New password is required",
                  minLength: {value: 8, message: "Password must be at least 8 characters"},
                })}
                className={errors.newPassword_sdk_api_key ? "border-red-500" : ""}
            />
            {errors.newPassword_sdk_api_key && (
                <p className="text-red-500 text-xs mt-1 text-left">{errors.newPassword_sdk_api_key.message?.toString()}</p>
            )}
          </div>
          <div>
            <Input
                type="password"
                placeholder="Confirm New Password"
                {...register("confirmPassword_sdk_api_key", {
                  required: "Please confirm your new password",
                  validate: value =>
                      value === newPassword || "The passwords do not match"
                })}
                className={errors.confirmPassword_sdk_api_key ? "border-red-500" : ""}
            />
            {errors.confirmPassword_sdk_api_key && (
                <p className="text-red-500 text-xs mt-1 text-left">{errors.confirmPassword_sdk_api_key.message?.toString()}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
          <div className="mt-4 text-sm">
            <Link href="/login" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
  );
};

// Main page component
const ResetPasswordPage = () => {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <Suspense fallback={<div className="text-center"><p>Loading page...</p></div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
  );
};

export default ResetPasswordPage;
