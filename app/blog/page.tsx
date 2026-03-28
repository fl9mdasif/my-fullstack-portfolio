"use client";

import { useGetAllBlogsQuery } from "@/redux/api/blogApi";
import LoadingSpinner from "@/components/shared/loading";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IconCalendar, IconUser, IconHeart } from "@tabler/icons-react";
import { cleanDescription } from "@/utils/techStackMatcher";

const BlogsPage = () => {
  const { data: blogsData, isLoading } = useGetAllBlogsQuery(undefined);
  const blogs = blogsData?.data || [];
  const [likedBlogs, setLikedBlogs] = useState<Record<string, boolean>>({});

  // Load liked blogs from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
    setLikedBlogs(stored);

    // Listen for storage changes (when liked from another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "likedBlogs") {
        const updated = JSON.parse(e.newValue || "{}");
        setLikedBlogs(updated);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-[#06091f]">
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

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
              <Link key={blog.id} href={`/blog/${blog._id}`} className="group">
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-black-100/50 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 h-full flex flex-col">
                  {/* Blog Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Publish Date Badge */}
                    <div className="absolute top-4 left-4 bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <IconCalendar className="w-4 h-4" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h2>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {cleanDescription(blog.description)}
                    </p>

                    {/* Author and Likes */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center ">
                        {/* <IconUser className="w-4 h-4 text-gray-300" /> */}
                        {/* <div className="w-8 mr-1 rounded-full"> */}
                        <Image
                          src="https://avatars.githubusercontent.com/u/73554861?v=4"
                          width={100}
                          height={100}
                          alt="author image"
                          className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center"
                        />
                        <span className="text-gray-300 text-sm font-medium">
                          <span>dev_asif</span>
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

          {/* Empty State */}
          {blogs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">
                No blogs available yet.
              </div>
              <div className="text-gray-500 text-sm mt-2">
                Check back soon for new content!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
