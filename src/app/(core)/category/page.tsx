"use server";

import {getPosts} from "@/server/appwrite.server.config";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

export default async function Page() {
  const posts = await getPosts();

  if (!posts) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
      <section className="animate-fade-in">
        {/* Hero Section */}
        <section className="hero-pattern bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 mb-8 shadow-card">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gradient mb-4">
              Discover Authentic Indonesian Street Food
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore the best KakiLima stores in your area and taste the authentic flavors of Indonesia
            </p>
          </div>
        </section>

        {/* Store Cards Grid */}
        <section
            className={cn(`
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
              animate-slide-up
            `)}
        >
          {
            posts.map((post, index) => (
                <Link
                    key={index}
                    href={`/detail/${post.$id}`}
                    className="group focus-ring rounded-2xl"
                    style={{animationDelay: `${index * 0.1}s`}}
                >
                  <Card
                      className={cn(`
                        cursor-pointer 
                        transition-all duration-300 
                        hover:shadow-card-hover 
                        hover:-translate-y-2 
                        border-gray-200/50 
                        hover:border-primary/30
                        bg-white/80 
                        backdrop-blur-sm 
                        rounded-2xl 
                        overflow-hidden
                        group-hover:scale-[1.02]
                        animate-scale-in
                      `)}
                  >
                    <CardHeader className={cn(`relative overflow-hidden p-0`)}>
                      {post.image ? (
                          <div className="relative h-48 w-full">
                            <Image
                                src={
                                  `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_STORAGE_ID}/files/${post.image}/view?project=${process.env.APPWRITE_PROJECT_ID}&mode=admin`
                                }
                                className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110`}
                                width={300}
                                height={200}
                                alt={post.name}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                      ) : (
                          <div className="h-48 w-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                            <div className="text-6xl opacity-60">🥘</div>
                          </div>
                      )}
                      <div className="p-6">
                        <CardTitle className={cn(`text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300`)}>
                          {post.name}
                        </CardTitle>
                        {post.description && (
                          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                            {post.description}
                          </p>
                        )}
                      </div>
                    </CardHeader>

                    <CardFooter className={cn(`p-6 pt-0`)}>
                      <div className="flex items-center text-gray-500 text-sm">
                        <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span title={post.location} className="truncate">
                          {post.location}
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
            ))
          }
        </section>

        {/* Enhanced pagination */}
        <div className="mt-12 flex justify-center animate-fade-in">
          <Pagination>
            <PaginationContent className="shadow-card bg-white/80 backdrop-blur-sm rounded-2xl px-2">
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  className="hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis/>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  className="hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
  )
}