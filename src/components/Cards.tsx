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
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import AddBlog from "./AddBlog";

export default function Cards() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Card my={8} maxW="xl">
      <CardHeader>
        <Flex className="gap-4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

            <Box>
              <Heading size="sm">Segun Adebayo</Heading>
              <Text>Creator, Chakra UI</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          With Chakra UI, I wanted to sync the speed of development with the
          speed of design. I wanted the developer to be just as excited as the
          designer to create a screen.
        </Text>
      </CardBody>
      <CardFooter gap={2}>
        <Link href={"/detail"}>
          <Button variant="outline" colorScheme="blue">
            View here
          </Button>
        </Link>
        <Button variant="outline" colorScheme="red">
          Delete
        </Button>
        <Button onClick={onOpen} variant="outline" colorScheme="yellow">
          Edit
        </Button>
      </CardFooter>
      <AddBlog isOpen={isOpen} onClose={onClose} />
    </Card>
  );
}
