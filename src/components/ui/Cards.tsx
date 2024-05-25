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
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import AddBlog from "../layout/AddBlog";
import { deleteBlogs, getDetailBlog } from "@/api/blog";
import EditBlog from "../layout/EditBlog";

export default function Cards(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detail, setDetail] = useState();
  const toast = useToast();

  const actionGetDetail = async (id: any) => {
    onOpen();
    const response = await getDetailBlog(id);
    setDetail(response.data);
  };

  const actiondelete = async (id: any) => {
    const response = await deleteBlogs(id);
    console.log(response);
    if (response.status != 204) {
      toast({
        title: `delete blog failed`,
        position: "top",
        status: "error",
        isClosable: true,
      });
    }
    toast({
      title: `delete blog succesfully`,
      position: "top",
      status: "success",
      isClosable: true,
    });
    window.location.reload();
  };

  return (
    <Card my={8} maxW={props.comment == true ? "md" : "xl"}>
      <CardHeader>
        <Flex className="gap-4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar src="https://bit.ly/broken-link" />

            <Box>
              <Heading size="sm">{props.user}</Heading>
              {props.comment == true ? (
                <Text fontSize="sm">{props.email}</Text>
              ) : (
                <Text>
                  {props.status == "active" ? (
                    <Badge colorScheme="green">Active</Badge>
                  ) : (
                    <Badge colorScheme="yellow">Inactive</Badge>
                  )}
                </Text>
              )}
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody py={1}>
        <Heading className="truncate" as={"h2"} size={"md"}>
          {props.title}
        </Heading>
        <Text className="text-ellipsis overflow-hidden line-clamp-2 ">
          {props.content}
        </Text>
      </CardBody>
      <CardFooter py={2} gap={2}>
        {props.type == "comment" ? null : props.type == "dashboard" ? (
          <Box>
            <Link href={`/detail/${props.id}`}>
              <Button variant="outline" colorScheme="blue">
                View here
              </Button>
            </Link>
            <Button
              onClick={() => actiondelete(props.id)}
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
      </CardFooter>
      <AddBlog isOpen={isOpen} onClose={onClose} />
      <EditBlog blog={detail} isOpen={isOpen} onClose={onClose} />
    </Card>
  );
}
