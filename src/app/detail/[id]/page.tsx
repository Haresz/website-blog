"use client";
import React from "react";
import {
  HStack,
  Heading,
  Image,
  Text,
  Spinner,
  Badge,
  VStack,
  Avatar,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useBlogDetail } from "@/hooks/useBlogDetail";
import { useComments } from "@/hooks/useComents";
import AddComent from "@/components/layout/AddComent";
import { getDetailUser } from "@/api/user";
import Nav from "@/components/common/Nav";
import Footer from "@/components/common/Footer";

export default function Page() {
  const params = useParams();
  const { blog, loading: blogLoading } = useBlogDetail(params.id as string);
  const {
    comments,
    loading: commentsLoading,
    refetchComments,
  } = useComments(params.id as string);
  const [user, setUser] = React.useState<string>("");
  React.useEffect(() => {
    const fetchUser = async () => {
      if (blog?.user_id) {
        try {
          const response = await getDetailUser(blog.user_id);
          console.log(response);
          setUser(response.data.name);
        } catch (error) {
          setUser("username");
        }
      }
    };

    fetchUser();
  }, [blog]);

  if (blogLoading || commentsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Nav theme="light" />
      <Heading
        as="h1"
        size="4xl"
        className="sm:mx-20 mx-4 mt-20 mb-4 text-start"
      >
        {blog?.title}
      </Heading>
      <HStack justifyContent={"left"} className="sm:mx-20 mx-4 mt-12">
        <Badge
          className="border-2 text-dark"
          backgroundColor={"#F9FAFA"}
          borderRadius={50}
          px={8}
          py={3}
        >
          <Text fontWeight="medium" fontSize="sm">
            {user}
          </Text>
        </Badge>
      </HStack>
      <Image
        className="w-full sm:px-20 px-4 my-20"
        height={400}
        objectFit="cover"
        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Blog Cover"
      />
      <Text className="sm:m-20 m-4 mt-10 font-normal text-justify text-lg text-lightGray">
        {blog?.body}
      </Text>
      <VStack
        className="sm:mx-20 mx-4 my-10 p-8"
        borderWidth="1px"
        borderRadius="xs"
        alignItems={"start"}
      >
        <Heading size={"xl"}>Comments</Heading>
        <VStack className="w-full">
          <Box maxH={400} minH={"fit-content"} className="w-full overflow-auto">
            {comments.map((item: any) => (
              <Box className="w-full" key={item.id} my={6}>
                <Flex className="gap-4">
                  <Flex flex="1" gap="4" alignItems="start" flexWrap="wrap">
                    <Avatar src="https://bit.ly/broken-link" />
                    <Box>
                      <Heading size="sm">{item.name}</Heading>
                      <Text className="text-ellipsis overflow-hidden line-clamp-2 mt-2 text-lightGray">
                        {item.body}
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Box>
          <AddComent refetchComments={refetchComments} />
        </VStack>
      </VStack>
      <Footer />
    </>
  );
}
