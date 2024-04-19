"use client";
import React, { useEffect, useState } from "react";
import { HStack, Heading, Image, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { getComentsBlogs, getDetailBlog } from "@/api/blog";
import Cards from "@/components/Cards";
import { getDetailUser } from "@/api/user";

export default function page() {
  const [blog, setBlog] = useState<any>();
  const [user, setUser] = useState<any>("");
  const [comments, setComent] = useState([]);
  const params = useParams();

  const actionGetDetail = async () => {
    const response = await getDetailBlog(params.id);
    setBlog(response.data);
  };

  const actionGetComent = async () => {
    const response = await getComentsBlogs(params.id);
    setComent(response.data);
  };

  useEffect(() => {
    actionGetDetail();
    actionGetComent();
  }, []);

  const actionGetUser = async () => {
    if (blog?.user_id) {
      try {
        const response = await getDetailUser(blog.user_id);
        setUser(response.data.name);
      } catch (error) {
        setUser("username");
      }
    }
  };

  useEffect(() => {
    actionGetUser();
  }, [blog]);

  return (
    <>
      <>
        <Image
          className="w-full h-96"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Chakra UI"
        />
        <Heading className="mx-20 mt-20 mb-4">{blog?.title}</Heading>
        <HStack className="mx-20">
          <Text fontSize={"md"}>Author :</Text>
          <Heading size={"sm"}>{user}</Heading>
        </HStack>

        <Text className="m-20 font-normal text-justify text-lg">
          {blog?.body}
        </Text>
      </>
      <Heading className="mx-20" size={"md"}>
        Coment
      </Heading>
      <HStack className="mx-20">
        {comments?.map((item: any) => {
          return (
            <Cards
              key={item.id}
              user={item.name}
              content={item.body}
              type="comment"
              email={item.email}
            />
          );
        })}
      </HStack>
    </>
  );
}
