import { HStack, Text } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  return (
    <HStack
      flexWrap={"wrap"}
      justifyContent={"space-between"}
      className="text-lightGray sm:mx-20 mx-4 mt-40 mb-8"
    >
      <Text size={"xs"}>©loremipsum 2024. All Rights Reserved</Text>
      <HStack justifyContent={"start"} gap={2}>
        <Text size={"xs"}>Instagram</Text>
        <Text size={"xs"}>You Tube</Text>
        <Text size={"xs"}>LinkedIn</Text>
      </HStack>
    </HStack>
  );
}
