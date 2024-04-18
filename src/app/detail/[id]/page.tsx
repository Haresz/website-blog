"use client";
import React, { useEffect, useState } from "react";
import { Heading, Image, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { getDetailBlog } from "@/api/blog";

export default function page() {
  const [blog, setBlog] = useState<any>();
  const params = useParams();
  console.log(params);

  const actionGetUser = async () => {
    const response = await getDetailBlog(params.id);
    setBlog(response.data);
  };

  useEffect(() => {
    actionGetUser();
  }, []);

  console.log(blog);
  return (
    <div>
      <div className="">
        <Image
          className="w-full h-96"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Chakra UI"
        />
        <Heading className="m-20">{blog?.title}</Heading>

        <Text className="m-20 font-normal text-justify text-lg">
          {blog?.body}
        </Text>
      </div>
    </div>
  );
}
