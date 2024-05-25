import { useState, useEffect } from "react";
import { getComentsBlogs } from "@/api/blog";
import { Comment } from "@/types";

export const useComments = (blogId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComentsBlogs(blogId);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [blogId]);

  return { comments, loading };
};
