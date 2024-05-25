"use client";
import { useEffect, useState } from "react";
import Cards from "@/components/ui/Cards";
import InputSearch from "@/components/ui/InputSearch";
import { Heading, Spinner } from "@chakra-ui/react";
import Pagination from "@/components/ui/Pagination";
import { useFetchBlogs } from "@/hooks/useFetchBlogs";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { Blog } from "../types";

interface SearchParams {
  query?: string;
  page?: string;
}

export default function Home({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const [page, setPage] = useState(1);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [maxPage, setMaxPage] = useState(1);
  const query = searchParams?.query || "";
  const { blogs: allBlogs, loading: blogsLoading } = useFetchBlogs();
  const { users, loading: usersLoading } = useFetchUsers();
  const loading = blogsLoading || usersLoading;

  const filterBlogs = () => {
    const startIndex = (page - 1) * 4;
    const endIndex = page * 4;
    const filteredData = allBlogs.filter((blog) =>
      blog?.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBlogs(filteredData.slice(startIndex, endIndex));
    setMaxPage(Math.ceil(filteredData.length / 4));
  };

  useEffect(() => {
    filterBlogs();
  }, [query, page, allBlogs]);

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
