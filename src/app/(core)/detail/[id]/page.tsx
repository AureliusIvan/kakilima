import {getPost} from "@/server/appwrite.server.config";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default async function Page({params}: { params: { id: string } }) {
  const data = await getPost(params.id);

  if (!data) {
    // Handle the case where post data is not found (e.g., during build with missing env vars)
    // You might want to return a proper "Not Found" component or a simple message.
    // For the build to pass, returning null or a simple div is often sufficient.
    return (
        <div className="p-6 max-w-[600px] mx-auto text-center">
          <p>Post not found or an error occurred.</p>
          <Link href="/" className={cn(buttonVariants({variant: "default"}), "mt-4")}>
            Go Home
          </Link>
        </div>
    );
  }

  const location = data.location.replace(/\s/g, '%20');
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const BASE_URL = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${location}`;

  return (
      <>
        <section
            className={cn(`p-6 max-w-[600px] space-y-1.5`)}
        >
          <Link
              className={cn(buttonVariants({variant: `default`}))}
              href={`/`}
          >
            Back
          </Link>

          <Image
              className={cn(`rounded-lg`, `mb-4`, `w-full object-cover aspect-video`)}
              src={`${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_STORAGE_ID}/files/${data.image}/view?project=${process.env.APPWRITE_PROJECT_ID}&mode=admin`}
              width={200}
              height={200}
              alt={data.name}/>
          <h1
              className={cn(`text-2xl font-bold capitalize`)}
          >
            {data.name}
          </h1>
          <p>
            {data.location}
          </p>

          <div
              className={cn(`w-full`)}
          >
            <div
                className={cn(`w-full`)}
            >
              <iframe
                  allowFullScreen={true}
                  width="100%"
                  height="600"
                  src={BASE_URL}
              >
              </iframe>
            </div>
          </div>
        </section>
      </>
  )
}