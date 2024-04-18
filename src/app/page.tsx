"use client";
import { useEffect, useRef, useState } from "react";
import { getDataUser } from "@/api/user";
import Cards from "@/components/Cards";
import InputSearch from "@/components/InputSearch";
import { actionGetBlog } from "@/lib/features/blogSlice";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Heading } from "@chakra-ui/react";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const [users, setUsers] = useState([]);
  const blogs: any = useAppSelector(
    (state: RootState) => state.blogSlice.blogs
  );
  const query = searchParams?.query || "";
  const store = useAppStore();
  const initialized: any = useRef(false);

  if (!initialized.current) {
    store.dispatch(actionGetBlog());
    initialized.current = true;
  }

  const actionGetUser = async () => {
    const response = await getDataUser();
    setUsers(response.data);
  };

  useEffect(() => {
    actionGetUser();
  }, []);

  const filterBlogByQuery = (blog: any) => {
    return (
      blog?.title && blog.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div>
      <Heading
        style={{ fontSize: "200px" }}
        className="w-full text-center font-black border-b-2 py-8"
      >
        THE BLOG
      </Heading>
      <InputSearch />
      <div className="mx-20 flex flex-wrap justify-between">
        {blogs.filter(filterBlogByQuery).map((item: any) => {
          const user: any = users.find((user: any) => {
            return item.user_id === user.id; // tambahkan return di sini
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
        })}
      </div>
    </div>
  );
}
