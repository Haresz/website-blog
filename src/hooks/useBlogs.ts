import { useState, useEffect } from "react";
import { getDataBlogAll } from "@/api/blog";
import { Blog } from "@/types";

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await getDataBlogAll();
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return { blogs, loading, refetchBlogs: fetchBlogs };
};
