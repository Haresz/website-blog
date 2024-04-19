"use client";
import { getDataUser } from "@/api/user";
import AddBlog from "@/components/AddBlog";
import Cards from "@/components/Cards";
import InputSearch from "@/components/InputSearch";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { HStack, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import { PlusSquare } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export default function page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const [users, setUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const blogs: any = useAppSelector(
    (state: RootState) => state.blogSlice.blogs
  );
  const toast = useToast();

  const actionGetUser = async () => {
    const response = await getDataUser();
    setUsers(response.data);
  };

  useEffect(() => {
    actionGetUser();
  }, [blogs]);

  const filterBlogByQuery = (blog: any) => {
    return blog.title.toLowerCase().includes(query.toLowerCase());
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      toast({
        title: "Token expired",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      redirect("/");
    }
  });
  return (
    <div>
      <HStack alignItems={"center"}>
        <InputSearch />
        <Tooltip label="Add Blog" aria-label="A tooltip">
          <PlusSquare
            onClick={onOpen}
            className="mt-10 mb-10 text-gray-700"
            size={46}
          />
        </Tooltip>
      </HStack>
      <div className="mx-20 flex flex-wrap justify-between">
        {blogs.filter(filterBlogByQuery).map((item: any) => {
          const user: any = users.find((user: any) => {});
          if (user) {
            return (
              <Cards
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.body}
                user={user.name}
                status={user.status}
                type="dashboard"
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
              type="dashboard"
            />
          );
        })}
      </div>
      <AddBlog isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
