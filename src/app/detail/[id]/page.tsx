"use client";
import React, { useEffect, useState } from "react";
import { HStack, Heading, Image, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { getComentsBlogs, getDetailBlog } from "@/api/blog";
import Cards from "@/components/Cards";
import { getDetailUser } from "@/api/user";
import { PlusSquare } from "@phosphor-icons/react/dist/ssr";

export default function Page() {
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
        <Heading className="sm:mx-20 mx-4 mt-20 mb-4 text-start">
          {blog?.title}
        </Heading>
        <HStack justifyContent={"left"} className="sm:mx-20 mx-4">
          <Text fontSize={"md"}>Author :</Text>
          <Heading size={"sm"}>{user}</Heading>
        </HStack>

        <Text className="sm:m-20 m-4 mt-10 font-normal text-justify text-lg">
          {blog?.body}
        </Text>
      </>
      <HStack>
        <Heading className="sm:ml-20 ml-4" size={"md"}>
          Coment
        </Heading>
        <PlusSquare
          // onClick={onOpen}
          className="mt-10 mb-10 text-gray-700 cursor-pointer"
          size={30}
        />
      </HStack>

      <HStack flexWrap={"wrap"} className="sm:mx-20 mx-4">
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
