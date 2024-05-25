import { useEffect, useState } from "react";
import { actionGetBlog } from "@/lib/features/blogSlice";
import { useAppStore } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Blog } from "../types";

export const useFetchBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const store = useAppStore();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      await store.dispatch(actionGetBlog());
      const state = store.getState() as RootState;
      const newBlogs = state.blogSlice.blogs as Blog[];
      setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [store]);

  return { blogs, loading };
};
