"use client";
import { useEffect, useState } from "react";
import { getDataUser } from "@/api/user";
import Cards from "@/components/Cards";
import InputSearch from "@/components/InputSearch";
import { actionGetBlog } from "@/lib/features/blogSlice";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Heading, Spinner } from "@chakra-ui/react";
import Pagination from "@/components/Pagination";

interface Blog {
  id: number;
  title: string;
  body: string;
  user_id: number;
}

interface User {
  id: number;
  name: string;
  status: string;
}

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [maxPage, setMaxPage] = useState(1);
  const query = searchParams?.query || "";
  const store = useAppStore();

  const fetchBlogs = async (page: number) => {
    setLoading(true);
    try {
      await store.dispatch(actionGetBlog(page));
      const state = store.getState() as RootState;
      const newBlogs = state.blogSlice.blogs as Blog[];
      const dataBlogs = (prevBlogs: any) => [...prevBlogs, ...newBlogs];
      setAllBlogs(dataBlogs);
      setMaxPage(Math.ceil(dataBlogs.length / 4));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!allBlogs[page - 1]) {
      fetchBlogs(page);
    }
  }, [page, store, allBlogs]);

  const handleData = () => {
    const startIndex = (page - 1) * 4;
    const endIndex = page * 4;
    let data = allBlogs.filter(filterBlogByQuery).slice(startIndex, endIndex);
    setFilteredBlogs(data);
  };

  useEffect(() => {
    handleData();
  }, [query, page, allBlogs]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await getDataUser();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filterBlogByQuery = (blog: Blog) => {
    return (
      blog?.title && blog.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div>
      <Heading
        as="h1"
        size="4xl"
        className="w-full text-center font-black border-b-2 py-8"
      >
        THE BLOG
      </Heading>
      <InputSearch />
      <div className="sm:mx-20 mx-4 flex flex-wrap justify-between">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((item) => {
                const user = users.find((user) => item.user_id === user.id);
                return (
                  <Cards
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    content={item.body}
                    user={user ? user.name : "username"}
                    status={user ? user.status : "active"}
                  />
                );
              })
            ) : (
              <div className="mx-20">
                <p>No blogs found, Refresh Your Browser</p>
              </div>
            )}
          </>
        )}
      </div>
      <Pagination page={page} setPage={setPage} maxPage={maxPage} />
    </div>
  );
}
