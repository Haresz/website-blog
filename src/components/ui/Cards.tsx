import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  Heading,
  CardBody,
  CardFooter,
  Box,
  Text,
  Button,
  useDisclosure,
  Badge,
  useToast,
  VStack,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import AddBlog from "../layout/AddBlog";
import { deleteBlogs, getDetailBlog } from "@/api/blog";
import EditBlog from "../layout/EditBlog";
import Image from "next/image";
import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react/dist/ssr";

export default function Cards(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detail, setDetail] = useState();
  const toast = useToast();

  const actionGetDetail = async (id: any) => {
    onOpen();
    const response = await getDetailBlog(id);
    setDetail(response.data);
  };

  const actionDelete = async (id: any) => {
    const response = await deleteBlogs(id);
    if (response.status !== 204) {
      toast({
        title: `Delete blog failed`,
        position: "top",
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: `Delete blog successfully`,
        position: "top",
        status: "success",
        isClosable: true,
      });
      props.refetchBlogs();
    }
  };

  return (
    <Card my={8} maxW={400}>
      <CardHeader>
        <Flex className="gap-4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar src="https://bit.ly/broken-link" />
            <Box>
              <Heading size="md">{props.user}</Heading>
              {props.comment === true ? (
                <Text fontSize="sm">{props.email}</Text>
              ) : (
                <Text>
                  {props.status === "active" ? (
                    <Badge py={1} px={2} borderRadius={10} colorScheme="green">
                      Active
                    </Badge>
                  ) : (
                    <Badge colorScheme="yellow">Inactive</Badge>
                  )}
                </Text>
              )}
            </Box>
          </Flex>
          {props.type === "dashboard" ? (
            <HStack>
              <Box
                onClick={() => actionGetDetail(props.id)}
                className="p-3 text-primaryBtn border rounded-full border-gray-300 cursor-pointer"
              >
                <PencilSimpleLine size={30} />
              </Box>
              <Box
                onClick={() => actionDelete(props.id)}
                className="p-3 text-red-600 border rounded-full border-gray-300 cursor-pointer"
              >
                <TrashSimple size={30} />
              </Box>
            </HStack>
          ) : null}
        </Flex>
      </CardHeader>
      <CardBody py={1}>
        <Box className=" bg-darkGray" width={"full"} height={160} />
        <Heading className="truncate mt-6" as={"h2"} size={"lg"}>
          <Link href={`/detail/${props.id}`}>{props.title}</Link>
        </Heading>
        <Text className="text-ellipsis text-lightGray overflow-hidden line-clamp-4 my-8">
          {props.content}
        </Text>
      </CardBody>
      {/* <CardFooter py={2} gap={2}>
        {props.type === "comment" ? null : props.type === "dashboard" ? (
          <Box>
            <Link href={`/detail/${props.id}`}>
              <Button variant="outline" colorScheme="blue">
                View here
              </Button>
            </Link>
            <Button
              onClick={() => actionDelete(props.id)}
              mx={2}
              variant="outline"
              colorScheme="red"
            >
              Delete
            </Button>
            <Button
              onClick={() => actionGetDetail(props.id)}
              variant="outline"
              colorScheme="yellow"
            >
              Edit
            </Button>
          </Box>
        ) : (
          <Link href={`/detail/${props.id}`}>
            <Button variant="outline" colorScheme="blue">
              View here
            </Button>
          </Link>
        )}
      </CardFooter> */}
      <AddBlog isOpen={isOpen} onClose={onClose} />
      <EditBlog
        blog={detail}
        isOpen={isOpen}
        onClose={onClose}
        refetchBlogs={props.refetchBlogs}
      />
    </Card>
  );
}
