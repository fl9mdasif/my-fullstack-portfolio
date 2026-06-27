"use client";

import { useGetAllBlogsQuery } from "@/redux/api/blogApi";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IconCalendar, IconHeart } from "@tabler/icons-react";
import { cleanDescription } from "@/utils/techStackMatcher";

// ─── Shimmer ──────────────────────────────────────────────────────────────────

const Shimmer = ({ className }: { className?: string }) => (
  <div
    className={`relative overflow-hidden bg-white/5 rounded-lg before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`}
  />
);

// ─── Blog Card Skeleton ───────────────────────────────────────────────────────

const BlogCardSkeleton = () => (
  <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] overflow-hidden flex flex-col">
    {/* Image area */}
    <Shimmer className="h-48 w-full rounded-none" />

    {/* Content */}
    <div className="p-6 flex flex-col gap-3 flex-1">
      {/* Title */}
      <Shimmer className="h-5 w-full rounded-md" />
      <Shimmer className="h-5 w-3/4 rounded-md" />

      {/* Description */}
      <div className="space-y-2 mt-1">
        <Shimmer className="h-3.5 w-full rounded" />
        <Shimmer className="h-3.5 w-full rounded" />
        <Shimmer className="h-3.5 w-2/3 rounded" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-3">
        <div className="flex items-center gap-2">
          <Shimmer className="w-8 h-8 rounded-full" />
          <Shimmer className="h-3.5 w-20 rounded" />
        </div>
        <Shimmer className="h-3.5 w-10 rounded" />
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const BlogsPage = () => {
  const { data: blogsData, isLoading } = useGetAllBlogsQuery(undefined);

  const blogs = blogsData|| [];

  // console.log('blogs',blogsData.data )

  const [likedBlogs, setLikedBlogs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
    setLikedBlogs(stored);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "likedBlogs") {
        const updated = JSON.parse(e.newValue || "{}");
        setLikedBlogs(updated);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#06091f]">
      {/* shimmer keyframe */}
      <style>{`@keyframes shimmer { to { transform: translateX(200%); } }`}</style>

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Latest <span className="text-blue-400">Blogs</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Dive into the fascinating world of technology, programming, and
              innovation. Explore insights, tutorials, and thoughts from the
              world of software development.
            </p>
          </div>

          {/* Grid — skeleton or real */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? [...Array(6)].map((_, i) => <BlogCardSkeleton key={i} />)
              : blogs.map((blog: any) => (
                  <Link key={blog._id} href={`/blog/${blog._id}`} className="group">
                    <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-black-100/50 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 h-full flex flex-col">

                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={blog.coverImage}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* Date badge */}
                        <div className="absolute top-4 left-4 bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                          <IconCalendar className="w-4 h-4" />
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                          {blog.title}
                        </h2>

                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                          {cleanDescription(blog.description)}
                        </p>

                        {/* Author + Likes */}
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex gap-2 items-center">
                            <Image
                              src="https://avatars.githubusercontent.com/u/73554861?v=4"
                              width={32}
                              height={32}
                              alt="author image"
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="text-gray-300 text-sm font-medium">
                              dev_asif
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-gray-400">
                            <IconHeart
                              className={`w-4 h-4 ${likedBlogs[blog._id] ? "text-red-400 fill-current" : ""}`}
                            />
                            <span className="text-sm">{blog.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>

          {/* Empty state — only show after loading is done */}
          {!isLoading && blogs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">📭</p>
              <p className="text-gray-400 text-lg font-medium">No blogs available yet.</p>
              <p className="text-gray-600 text-sm mt-2">Check back soon for new content!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;