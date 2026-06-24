/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} from "@/redux/api/blogApi";
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
import NavBar from "@/components/shared/Navbar";

// ─── Shimmer ──────────────────────────────────────────────────────────────────

const Shimmer = ({ className }: { className?: string }) => (
  <div
    className={`relative overflow-hidden bg-white/5 rounded-lg before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`}
  />
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const BlogDetailsSkeleton = () => (
  <div className="min-h-screen bg-[#06091f]">
    <NavBar />
    <div className="pt-24 pb-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back */}
      <Shimmer className="h-4 w-28 mb-10 rounded-full" />

      {/* Cover image */}
      <Shimmer className="w-full aspect-video rounded-2xl mb-8" />

      {/* Meta row */}
      <div className="flex gap-4 mb-6">
        <Shimmer className="h-4 w-28 rounded-full" />
        <Shimmer className="h-4 w-20 rounded-full" />
        <Shimmer className="h-4 w-16 rounded-full" />
      </div>

      {/* Title */}
      <Shimmer className="h-9 w-full rounded-lg mb-3" />
      <Shimmer className="h-9 w-4/5 rounded-lg mb-8" />

      {/* Action buttons */}
      <div className="flex gap-3 mb-12">
        <Shimmer className="h-11 w-32 rounded-xl" />
        <Shimmer className="h-11 w-24 rounded-xl" />
        <Shimmer className="h-11 w-24 rounded-xl" />
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.06] mb-10" />

      {/* Body paragraphs */}
      <div className="space-y-3">
        {[...Array(12)].map((_, i) => (
          <Shimmer
            key={i}
            className={`h-4 rounded ${i % 5 === 4 ? "w-2/3" : "w-full"}`}
          />
        ))}
      </div>

      {/* Author card */}
      <div className="mt-12 flex items-center gap-4 border border-white/[0.07] rounded-2xl p-6 bg-white/[0.02]">
        <Shimmer className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Shimmer className="h-4 w-24 rounded" />
          <Shimmer className="h-3 w-36 rounded" />
        </div>
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

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

  useEffect(() => {
    if (blog) {
      setCurrentLikes(parseInt(blog.likes) || 0);
      const liked = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
      setIsLiked(liked[blogId] || false);
      const bookmarked = JSON.parse(localStorage.getItem("bookmarkedBlogs") || "{}");
      setIsBookmarked(bookmarked[blogId] || false);
    }
  }, [blog, blogId]);

  const handleLike = async () => {
    if (!blog || isUpdating) return;
    const newIsLiked = !isLiked;
    const newLikes = newIsLiked ? currentLikes + 1 : currentLikes - 1;
    setIsLiked(newIsLiked);
    setCurrentLikes(newLikes);
    const liked = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
    newIsLiked ? (liked[blogId] = true) : delete liked[blogId];
    localStorage.setItem("likedBlogs", JSON.stringify(liked));
    try {
      await updateBlog({ id: blogId, data: { likes: newLikes.toString() } }).unwrap();
    } catch {
      setIsLiked(!newIsLiked);
      setCurrentLikes(currentLikes);
      const revert = JSON.parse(localStorage.getItem("likedBlogs") || "{}");
      !newIsLiked ? (revert[blogId] = true) : delete revert[blogId];
      localStorage.setItem("likedBlogs", JSON.stringify(revert));
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: blog.title, url });
        setShareMessage("Shared!");
      } else {
        await navigator.clipboard.writeText(url);
        setShareMessage("Link copied!");
      }
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setShareMessage("Link copied!");
      } catch {
        setShareMessage("Copy the URL manually.");
      }
    }
    setTimeout(() => setShareMessage(""), 3000);
  };

  const handleBookmark = () => {
    const newVal = !isBookmarked;
    setIsBookmarked(newVal);
    const bm = JSON.parse(localStorage.getItem("bookmarkedBlogs") || "{}");
    newVal
      ? (bm[blogId] = { title: blog.title, coverImage: blog.coverImage, bookmarkedAt: new Date().toISOString() })
      : delete bm[blogId];
    localStorage.setItem("bookmarkedBlogs", JSON.stringify(bm));
  };

  if (isLoading) return <BlogDetailsSkeleton />;

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#06091f] flex items-center justify-center">
        <NavBar />
        <div className="text-center space-y-4">
          <p className="text-5xl">📭</p>
          <h1 className="text-3xl font-bold text-white">Blog not found</h1>
          <p className="text-white/40 text-sm">This article may have been removed.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors">
            <IconArrowLeft className="w-4 h-4" /> Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06091f] text-white">
      <style>{`@keyframes shimmer { to { transform: translateX(200%); } }`}</style>
      <NavBar />

      {/* Subtle top glow */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative pt-24 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Back ── */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 group text-sm font-medium"
          >
            <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Blogs
          </Link>

          {/* ── Cover Image ── */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.07] mb-10 bg-white/5">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            {/* gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#06091f]/60 via-transparent to-transparent" />
          </div>

          {/* ── Meta Row ── */}
          <div className="flex flex-wrap items-center gap-5 mb-5 text-sm text-white/40">
            <span className="flex items-center gap-1.5">
              <IconCalendar className="w-4 h-4 text-blue-400" />
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <IconUser className="w-4 h-4 text-emerald-400" />
              {blog.author_name || "dev_asif"}
            </span>
            <span className="flex items-center gap-1.5">
              <IconHeart className="w-4 h-4 text-red-400" />
              {currentLikes} likes
            </span>
          </div>

          {/* ── Title ── */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-8">
            {blog.title}
          </h1>

          {/* ── Action Buttons ── */}
          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={handleLike}
              disabled={isUpdating}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border transition-all hover:scale-[1.02] active:scale-95 ${
                isLiked
                  ? "bg-red-500/10 border-red-500/30 text-red-400"
                  : "bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/[0.08]"
              } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <IconHeart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              {isUpdating ? "Updating…" : isLiked ? "Liked" : "Like"}
            </button>

            <button
              onClick={handleShare}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/[0.08] transition-all hover:scale-[1.02]"
            >
              <IconShare className="w-4 h-4" />
              Share
              {shareMessage && (
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                  {shareMessage}
                </span>
              )}
            </button>

            <button
              onClick={handleBookmark}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border transition-all hover:scale-[1.02] ${
                isBookmarked
                  ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                  : "bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/[0.08]"
              }`}
            >
              <IconBookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
              {isBookmarked ? "Saved" : "Save"}
            </button>
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-white/[0.06] mb-10" />

          {/* ── Body ── */}
          <div
            className="
              prose prose-invert max-w-none
              prose-p:text-white/60 prose-p:leading-[1.9] prose-p:text-base
              prose-h1:text-white prose-h1:font-bold prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4
              prose-h2:text-white prose-h2:font-semibold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
              prose-h3:text-white/90 prose-h3:font-semibold prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-blue-300 prose-code:bg-blue-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-white/[0.04] prose-pre:border prose-pre:border-white/[0.07] prose-pre:rounded-xl
              prose-blockquote:border-l-blue-500 prose-blockquote:text-white/50 prose-blockquote:bg-white/[0.02] prose-blockquote:rounded-r-lg prose-blockquote:py-1
              prose-ul:text-white/60 prose-ol:text-white/60
              prose-li:marker:text-blue-400
              prose-hr:border-white/[0.06]
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            "
          >
            <div className="whitespace-pre-line">
              {cleanDescription(blog.description)}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-white/[0.06] mt-12 mb-10" />

          {/* ── Author Card ── */}
          <div className="flex items-center gap-4 p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <Image
              src="https://avatars.githubusercontent.com/u/73554861?v=4"
              width={48}
              height={48}
              alt="author"
              className="w-12 h-12 rounded-full ring-2 ring-blue-500/30"
            />
            <div>
              <a
                href="https://www.linkedin.com/in/fl9mdasif/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold text-sm hover:text-blue-400 transition-colors"
              >
                dev_asif
              </a>
              <p className="text-white/40 text-xs mt-0.5">Full Stack Developer · MERN / Next.js</p>
            </div>
            <a
              href="https://www.linkedin.com/in/fl9mdasif/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs text-blue-400 border border-blue-500/30 px-4 py-1.5 rounded-full hover:bg-blue-500/10 transition-colors"
            >
              Follow
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogDetails;