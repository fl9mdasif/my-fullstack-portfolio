"use client";

import BlogCard from "@/components/ui/BlogCard";
import { useGetAllBlogsQuery } from "@/redux/api/blogApi";
import { TBlog } from "../../types";
import LoadingSpinner from "@/components/shared/loading";

const BlogsPage = () => {
  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useGetAllBlogsQuery(undefined);
  console.log(blogs);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-4xl text-center my-5">
        All Blogs From <span className="text-accent">CodingWithAsif</span>
      </h1>
      <p className="text-xl text-center text-gray-400 w-2/4 mx-auto">
        <i>
          Dive into the fascinating world of quantum computing, where unlocking
          unprecedented computational power.
        </i>
      </p>

      <div className="grid grid-cols-3 gap-4 my-5">
        {blogs?.map((blog: TBlog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
