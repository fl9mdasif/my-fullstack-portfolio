/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} from "@/redux/api/blogApi";
import LoadingSpinner from "@/components/shared/loading";
import NavBar from "@/components/shared/Navbar";
import {
  IconArrowLeft,
  IconCalendar,
  IconUser,
  IconHeart,
  IconShare,
  IconBookmark,
} from "@tabler/icons-react";
import { cleanDescription } from "@/utils/techStackMatcher";
import Image from "next/image";

const BlogDetails = () => {
  const params = useParams();
  const blogId = params.blogId as string;

  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(0);
  const [shareMessage, setShareMessage] = useState("");

  const { data: blogData, isLoading, error } = useGetSingleBlogQuery(blogId);
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  const blog = blogData?.data || blogData;

  // Initialize likes state when blog data is loaded
  useEffect(() => {
    if (blog) {
      const likesCount = parseInt(blog.likes) || 0;
      setCurrentLikes(likesCount);

      // Check if user has liked this blog (stored in localStorage)
      const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
      setIsLiked(likedBlogs[blogId] || false);
    }
  }, [blog, blogId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error("Blog API Error:", error);
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">
            Blog Not Found
          </h1>
          <p className="text-gray-300 mb-4">
            The blog youre looking for doesnt exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  // Handle like button click
  const handleLike = async () => {
    if (!blog || isUpdating) return;

    // Optimistic update
    const newIsLiked = !isLiked;
    const newLikes = newIsLiked ? currentLikes + 1 : currentLikes - 1;

    // Update local state immediately
    setIsLiked(newIsLiked);
    setCurrentLikes(newLikes);

    // Update localStorage
    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
    if (newIsLiked) {
      likedBlogs[blogId] = true;
    } else {
      delete likedBlogs[blogId];
    }
    localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));

    try {
      // Update the blog with new like count
      await updateBlog({
        id: blogId,
        data: { likes: newLikes.toString() },
      }).unwrap();
    } catch (error) {
      console.error("Failed to update likes:", error);

      // Revert optimistic update on error
      setIsLiked(!newIsLiked);
      setCurrentLikes(currentLikes);

      // Revert localStorage
      const revertLikedBlogs = JSON.parse(
        localStorage.getItem("likedBlogs") || "{}",
      );
      if (!newIsLiked) {
        revertLikedBlogs[blogId] = true;
      } else {
        delete revertLikedBlogs[blogId];
      }
      localStorage.setItem("likedBlogs", JSON.stringify(revertLikedBlogs));
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">
            Blog Not Found
          </h1>
          <Link
            href="/blog"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <NavBar />
      {isLoading && <LoadingSpinner />}

      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <IconArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blogs
          </Link>

          {/* Hero Section */}
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 md:p-12">
              {/* Blog Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-700 mb-8">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Blog Meta */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2 text-gray-300">
                  <IconCalendar className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <IconUser className="w-5 h-5 text-green-400" />
                  <span className="text-sm">{blog.author_name}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <IconHeart className="w-5 h-5 text-red-400" />
                  <span className="text-sm">{currentLikes} likes</span>
                </div>
              </div>

              {/* Blog Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleLike}
                  disabled={isUpdating}
                  className={`inline-flex items-center px-6 py-3 font-medium rounded-lg transition-colors ${
                    isLiked
                      ? "bg-red-700 hover:bg-red-800 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <IconHeart
                    className={`w-5 h-5 mr-2 ${isLiked ? "fill-current" : ""}`}
                  />
                  {isUpdating
                    ? "Updating..."
                    : isLiked
                      ? "Liked"
                      : "Like Article"}
                </button>

                <button className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors">
                  <IconShare className="w-5 h-5 mr-2" />
                  Share
                </button>

                <button className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors">
                  <IconBookmark className="w-5 h-5 mr-2" />
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 md:p-12">
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {cleanDescription(blog.description)}
              </div>
            </div>
          </div>

          {/* Author Section */}
          <div className="mt-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
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
                <span>
                  <a href="https://www.linkedin.com/in/fl9mdasif/">dev_asif</a>
                </span>
              </span>
            </div>
          </div>

          {/* Related Blogs Section (Placeholder) */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* This would be populated with related blogs */}
              <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                <div className="text-gray-400 text-center">
                  Related articles would appear here
                </div>
              </div>
              <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                <div className="text-gray-400 text-center">
                  Related articles would appear here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
