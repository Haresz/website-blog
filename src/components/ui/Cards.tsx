import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react/dist/ssr";
import AddBlog from "../layout/AddBlog";
import EditBlog from "../layout/EditBlog";
import { deleteBlogs, getDetailBlog } from "@/api/blog";
import { Blog } from "@/types";

interface CardsProps {
  id: string;
  title: string;
  content: string;
  user: string;
  status: string;
  type?: "dashboard";
  refetchBlogs?: () => void;
  comment?: boolean;
  email?: string;
}

const Cards: React.FC<CardsProps> = ({
  id,
  title,
  content,
  user,
  status,
  type,
  refetchBlogs = () => {},
  comment,
  email,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detail, setDetail] = useState<Blog | null>(null);
  const toast = useToast();

  const actionGetDetail = async (id: string) => {
    onOpen();
    const response = await getDetailBlog(id);
    setDetail(response.data);
  };

  const actionDelete = async (id: string) => {
    const response = await deleteBlogs(parseInt(id));
    if (response.status !== 204) {
      toast({
        title: "Delete blog failed",
        position: "top",
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Delete blog successfully",
        position: "top",
        status: "success",
        isClosable: true,
      });
      refetchBlogs();
    }
  };

  return (
    <Card my={8} maxW={400}>
      <CardHeader>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar src="https://bit.ly/broken-link" />
            <Box>
              <Heading w={160} className=" line-clamp-1" size="md">
                {user}
              </Heading>
              {comment ? (
                <Text fontSize="sm">{email}</Text>
              ) : (
                <Badge
                  mt={2}
                  py={1}
                  px={2}
                  borderRadius={10}
                  colorScheme={status === "active" ? "green" : "yellow"}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
              )}
            </Box>
          </Flex>
          {type === "dashboard" && (
            <HStack>
              <Box
                onClick={() => actionGetDetail(id)}
                className="p-3 text-primaryBtn border rounded-full border-gray-300 cursor-pointer"
              >
                <PencilSimpleLine size={30} />
              </Box>
              <Box
                onClick={() => actionDelete(id)}
                className="p-3 text-red-600 border rounded-full border-gray-300 cursor-pointer"
              >
                <TrashSimple size={30} />
              </Box>
            </HStack>
          )}
        </Flex>
      </CardHeader>
      <CardBody py={1}>
        <Box className=" bg-darkGray" width={"full"} height={160} />
        <Heading className="truncate mt-6" as={"h2"} size={"lg"}>
          <Link href={`/detail/${id}`}>{title}</Link>
        </Heading>
        <Text className="text-ellipsis text-lightGray overflow-hidden line-clamp-4 my-8">
          {content}
        </Text>
      </CardBody>
      <AddBlog isOpen={isOpen} onClose={onClose} />
      <EditBlog
        blog={detail}
        isOpen={isOpen}
        onClose={onClose}
        refetchBlogs={refetchBlogs}
      />
    </Card>
  );
};

export default Cards;
