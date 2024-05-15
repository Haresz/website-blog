"use client";
import { getDataUser } from "@/api/user";
import AddBlog from "@/components/AddBlog";
import Cards from "@/components/Cards";
import InputSearch from "@/components/InputSearch";
import {
  HStack,
  Tooltip,
  useDisclosure,
  useToast,
  Spinner,
  Center,
  Text,
} from "@chakra-ui/react";
import { PlusSquare } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import Pagination from "@/components/Pagination";
import { getDataBlogAll } from "@/api/blog";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const itemsPerPage = 4;
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const toast = useToast();

  const fetchUserData = async () => {
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

  const getAllBlogs = async () => {
    try {
      const response: any = await getDataBlogAll();
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    getAllBlogs();
  }, []);

  useEffect(() => {
    const storedUserData: any = localStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    if (userData) {
      const filtered = blogs.filter(
        (blog: any) => blog.user_id === userData.id
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [blogs]);

  useEffect(() => {
    const filtered = filteredBlogs.filter(filterBlogByQuery);
    setMaxPage(Math.ceil(filtered.length / itemsPerPage));
  }, [filteredBlogs, query]);

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
      localStorage.removeItem("userData");
      redirect("/");
    }
  }, []);

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
        {loading ? (
          <Center w="100%" h="100vh">
            <Spinner />
          </Center>
        ) : filteredBlogs.filter(filterBlogByQuery).length === 0 ? (
          <Center w="100%" h="50vh">
            <Text>No blogs found.</Text>
          </Center>
        ) : (
          filteredBlogs
            .filter(filterBlogByQuery)
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((item: any) => (
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
