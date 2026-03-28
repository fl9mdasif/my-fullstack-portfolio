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
import { Spotlight } from "@/components/ui/Spotlight";
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
  const [isBookmarked, setIsBookmarked] = useState(false);

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

      // Check if user has bookmarked this blog
      const bookmarkedBlogs = JSON.parse(localStorage.getItem("bookmarkedBlogs") || "{}");
      setIsBookmarked(bookmarkedBlogs[blogId] || false);
    }
  }, [blog, blogId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !blog) {
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

  // Handle share button click
  const handleShare = async () => {
    const url = window.location.href;
    const title = blog.title;
    const text = `Check out this article: ${title}`;

    try {
      // Check if Web Share API is available
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
        setShareMessage("Shared successfully!");
      } else {
        // Fallback: Copy URL to clipboard
        await navigator.clipboard.writeText(url);
        setShareMessage("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Fallback for older browsers or if share fails
      try {
        await navigator.clipboard.writeText(url);
        setShareMessage("Link copied to clipboard!");
      } catch (clipboardError) {
        console.error("Error copying to clipboard:", clipboardError);
        setShareMessage("Unable to share. Please copy the URL manually.");
      }
    }

    // Clear message after 3 seconds
    setTimeout(() => setShareMessage(""), 3000);
  };

  // Handle bookmark button click
  const handleBookmark = () => {
    const newIsBookmarked = !isBookmarked;
    setIsBookmarked(newIsBookmarked);

    // Update localStorage
    const bookmarkedBlogs = JSON.parse(localStorage.getItem("bookmarkedBlogs") || "{}");
    if (newIsBookmarked) {
      bookmarkedBlogs[blogId] = {
        title: blog.title,
        coverImage: blog.coverImage,
        author_name: blog.author_name,
        createdAt: blog.createdAt,
        bookmarkedAt: new Date().toISOString(),
      };
    } else {
      delete bookmarkedBlogs[blogId];
    }
    localStorage.setItem("bookmarkedBlogs", JSON.stringify(bookmarkedBlogs));
  };

  return (
    <div className="min-h-screen bg-[#06091f]">
      {/* Spotlight for premium look */}
      <div className="relative overflow-hidden">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

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
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative rounded-3xl border border-white/[0.1] bg-black-100/50 backdrop-blur-md p-8 md:p-12">
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
                  className={`inline-flex items-center px-6 py-3 font-medium rounded-xl transition-all hover:scale-105 active:scale-95 ${isLiked
                      ? "bg-red-500/20 border border-red-500/50 text-red-500"
                      : "bg-white/5 border border-white/[0.1] text-white hover:bg-white/10"
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

                <button
                  onClick={handleShare}
                  className="inline-flex items-center px-6 py-3 bg-white/5 border border-white/[0.1] hover:bg-white/10 text-white font-medium rounded-xl transition-all hover:scale-105 relative"
                >
                  <IconShare className="w-5 h-5 mr-2" />
                  Share
                  {shareMessage && (
                    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-50 animate-bounce">
                      {shareMessage}
                    </span>
                  )}
                </button>

                <button
                  onClick={handleBookmark}
                  className={`inline-flex items-center px-6 py-3 font-medium rounded-xl transition-all hover:scale-105 ${isBookmarked
                      ? "bg-blue-500/20 border border-blue-500/50 text-blue-500"
                      : "bg-white/5 border border-white/[0.1] text-white hover:bg-white/10"
                    }`}
                >
                  <IconBookmark
                    className={`w-5 h-5 mr-2 ${isBookmarked ? "fill-current" : ""}`}
                  />
                  {isBookmarked ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div className="relative rounded-3xl border border-white/[0.1] bg-black-100/50 backdrop-blur-md p-8 md:p-12 mb-12">
            <div className="prose prose-lg prose-invert max-w-none 
              prose-headings:text-white prose-headings:font-bold prose-headings:mb-4
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-6
              prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-6
              prose-li:text-gray-300 prose-li:mb-2
              prose-hr:border-white/[0.1] prose-hr:my-10">
              <div className="whitespace-pre-line">
                {cleanDescription(blog.description)}
              </div>
            </div>
          </div>

          {/* Author Section */}
          <div className="bg-black-100/50 backdrop-blur-md border border-white/[0.1] rounded-3xl p-8">
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
              {/* <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                <div className="text-gray-400 text-center">
                  Related articles would appear here
                </div>
              </div>
              <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
                <div className="text-gray-400 text-center">
                  Related articles would appear here
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
