"use client";

// export const dynamic = 'force-dynamic'; // Keep if Suspense alone isn't enough

import {useEffect, useState, Suspense} from "react"; // Added Suspense
import {useSearchParams} from "next/navigation";
import {account} from "@/utils/appwrite/appwrite.config";
import {useToast} from "@/components/ui/use-toast";
import Link from "next/link";
import {Button} from "@/components/ui/button";

// New component that uses useSearchParams
const VerifyEmailStatus = () => {
  const searchParams = useSearchParams();
  const {toast} = useToast();
  const [verificationStatus, setVerificationStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (userId && secret) {
      account.updateVerification(userId, secret)
          .then(() => {
            setVerificationStatus("success");
            toast({ // Toast is fine here as this useEffect runs client-side after initial render
              title: "Email Verified",
              description: "Your email has been successfully verified!",
            });
          })
          .catch((error: any) => {
            setVerificationStatus("error");
            const message = error.message || "An unexpected error occurred during verification.";
            setErrorMessage(message);
            toast({
              title: "Verification Failed",
              description: message,
              variant: "destructive",
            });
          });
    } else {
      setVerificationStatus("error");
      const message = "Missing verification details in the URL.";
      setErrorMessage(message);
      // Removed toast from here for consistency, though less likely to be an issue than in reset-password's useEffect initial error path
    }
  }, [searchParams, toast]); // Toast can remain if it's only for async operations, but be mindful

  if (verificationStatus === "verifying") {
    return (
        <>
          <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
          <p>Please wait while we confirm your email address.</p>
        </>
    );
  }
  if (verificationStatus === "success") {
    return (
        <>
          <h1 className="text-2xl font-bold mb-4 text-green-600">Email Verified!</h1>
          <p className="mb-6">Your email address has been successfully verified. You can now log in to your account.</p>
          <Link href="/login">
            <Button>Go to Login</Button>
          </Link>
        </>
    );
  }
  // Error state
  return (
      <>
        <h1 className="text-2xl font-bold mb-4 text-red-600">Verification Failed</h1>
        <p className="mb-6">{errorMessage || "We couldn't verify your email. Please try again or contact support."}</p>
        <Link href="/login">
          <Button variant="outline">Back to Login</Button>
        </Link>
      </>
  );
};

// Main page component
const VerifyEmailPage = () => {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <Suspense fallback={<div className="text-center"><p>Loading status...</p></div>}>
            <VerifyEmailStatus />
          </Suspense>
        </div>
      </div>
  );
};

export default VerifyEmailPage;
