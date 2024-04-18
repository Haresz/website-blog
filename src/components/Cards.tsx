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
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import AddBlog from "./AddBlog";

export default function Cards(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Card my={8} maxW={props.comment ? "md" : "xl"}>
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
        {
          props.comment == true ? null : (
            <Link href={`/detail/${props.id}`}>
              <Button variant="outline" colorScheme="blue">
                View here
              </Button>
            </Link>
          )
          /* <Button variant="outline" colorScheme="red">
          Delete
        </Button>
        <Button onClick={onOpen} variant="outline" colorScheme="yellow">
          Edit
        </Button> */
        }
      </CardFooter>
      <AddBlog isOpen={isOpen} onClose={onClose} />
    </Card>
  );
}
