import { Box, Text, Image, HStack, VStack, Button } from "@chakra-ui/react";
import { Toolbox, UserCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <Box className="w-full py-8 px-20 flex justify-between bg-white  border-b-2 font-bold text-black">
      <Link href={"/"}>
        <Text fontSize={"3xl"}>Your Name</Text>
      </Link>
      <HStack gap={4}>
        <Link href={"/dhasboard"}>
          <Toolbox size={38} />
        </Link>
        <UserCircle size={38} />
        <Link href={"/auth/sign-up"}>
          <Button colorScheme="blue">Sign up</Button>
        </Link>
        <Link href={"/auth/sign-in"}>
          <Button colorScheme="blue" variant="outline">
            Sign In
          </Button>
        </Link>
      </HStack>
    </Box>
  );
}
