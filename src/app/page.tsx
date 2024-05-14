"use client";
import { useEffect, useRef, useState } from "react";
import { getDataUser } from "@/api/user";
import Cards from "@/components/Cards";
import InputSearch from "@/components/InputSearch";
import { actionGetBlog } from "@/lib/features/blogSlice";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Heading, Spinner } from "@chakra-ui/react";
import Pagination from "@/components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const blogs: any = useAppSelector(
    (state: RootState) => state.blogSlice.blogs
  );
  const query = searchParams?.query || "";
  const store = useAppStore();

  useEffect(() => {
    store.dispatch(actionGetBlog(page));
  }, [page, store]);

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

  const filterBlogByQuery = (blog: any) => {
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
            {blogs?.length > 0 ? (
              blogs.filter(filterBlogByQuery).map((item: any) => {
                const user: any = users.find((user: any) => {
                  return item.user_id === user.id;
                });

                if (user) {
                  return (
                    <Cards
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      content={item.body}
                      user={user.name}
                      status={user.status}
                    />
                  );
                }
                return (
                  <Cards
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    content={item.body}
                    user={"username"}
                    status={"active"}
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
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
