"use client";
import React, { useEffect, useState } from "react";
import {
  HStack,
  Tooltip,
  useDisclosure,
  Spinner,
  Center,
  Text,
  useToast,
} from "@chakra-ui/react";
import { PlusSquare } from "@phosphor-icons/react/dist/ssr";
import { useUsers } from "@/hooks/useUsers";
import { useBlogs } from "@/hooks/useBlogs";
import AddBlog from "@/components/layout/AddBlog";
import Cards from "@/components/ui/Cards";
import InputSearch from "@/components/ui/InputSearch";
import Pagination from "@/components/ui/Pagination";
import { validateToken } from "@/utils/auth";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const toast = useToast();
  const query = searchParams?.query || "";
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const itemsPerPage = 4;
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { users, loading: usersLoading } = useUsers();
  const { blogs, loading: blogsLoading } = useBlogs();

  useEffect(() => {
    validateToken(toast);
  }, []);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : null;

    const filtered = userData
      ? blogs.filter((blog: any) => blog.user_id === userData.id)
      : blogs;

    setFilteredBlogs(filtered);
  }, [blogs]);

  useEffect(() => {
    const filtered = filteredBlogs.filter((blog: any) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );
    setMaxPage(Math.ceil(filtered.length / itemsPerPage));
  }, [filteredBlogs, query]);

  const filteredAndPaginatedBlogs = filteredBlogs
    .filter((blog: any) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    )
    .slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      <HStack alignItems="center">
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
        {usersLoading || blogsLoading ? (
          <Center w="100%" h="100vh">
            <Spinner />
          </Center>
        ) : filteredAndPaginatedBlogs.length === 0 ? (
          <Center w="100%" h="50vh">
            <Text>No blogs found.</Text>
          </Center>
        ) : (
          filteredAndPaginatedBlogs.map((item: any) => (
            <Cards
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.body}
              user={item.user_name || "username"}
              status={item.status || "active"}
              type="dashboard"
            />
          ))
        )}
      </div>
      <Pagination page={page} setPage={setPage} maxPage={maxPage} />
      <AddBlog isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
