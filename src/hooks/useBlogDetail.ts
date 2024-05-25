import { useState, useEffect } from "react";
import { getDetailBlog } from "@/api/blog";
import { Blog } from "@/types";

export const useBlogDetail = (id: string) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await getDetailBlog(id);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  return { blog, loading };
};
