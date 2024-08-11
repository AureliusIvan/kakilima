"use server";

import {getPosts} from "@/server/appwrite.server.config";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";

export default async function Page() {
  const posts = await getPosts();

  if (!posts) {
    return <div>Loading...</div>
  }

  return (
      <section>
        <section
            className={cn(` grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4`)}
        >
          {
            posts.map((post, index) => (
                <Link
                    key={index}
                    href={`/detail/${post.$id}`}
                >
                  <Card
                      className={cn(`cursor-pointer hover:shadow-lg `)}
                      key={post.$id}>
                    <CardHeader
                        className={cn(`relative overflow-hidden p-[10px]`)}
                    >
                      {post.image && (
                          <Image
                              src={
                                `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_STORAGE_ID}/files/${post.image}/view?project=${process.env.APPWRITE_PROJECT_ID}&mode=admin`
                              }
                              className={`rounded-md w-auto h-auto object-cover lg:h-48`}
                              width={200}
                              height={200}
                              alt={post.name}
                          />
                      )
                      }
                      <CardTitle>
                        {post.name}
                      </CardTitle>
                    </CardHeader>

                    <CardFooter
                        className={cn(`p-[10px]`)}
                    >
                      <p
                          title={post.location}
                          className={cn(`text-sm text-gray-500 truncate`)}
                      >
                        {post.location}
                      </p>
                    </CardFooter>
                  </Card>
                </Link>
            ))
          }
        </section>
      </section>
  )
}