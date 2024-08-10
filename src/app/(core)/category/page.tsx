"use server";

import {getPost} from "@/server/appwrite.server.config";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";

export default async function Page() {
  const posts = await getPost();

  if (!posts) {
    return <div>Loading...</div>
  }

  return (
      <section>
        <section
            className={cn(` grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`)}
        >
          {
            posts.map((post, index) => (
                <Link
                    key={index}
                    href={`/category/${post.$id}`}
                >
                  <Card
                      key={post.$id}>
                    <CardHeader>
                      {post.image && (
                          <Image
                              src={
                                `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_STORAGE_ID}/files/${post.image}/view?project=${process.env.APPWRITE_PROJECT_ID}&mode=admin`
                              }
                              className={`rounded-full w-auto h-auto`}
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
                    <CardFooter>
                      <p>
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