"use client";
import AddBlog from "@/components/AddBlog";
import Cards from "@/components/Cards";
import InputSearch from "@/components/InputSearch";
import { Box, HStack, Tooltip, useDisclosure } from "@chakra-ui/react";
import { PlusSquare } from "@phosphor-icons/react/dist/ssr";
import React from "react";

export default function page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <HStack alignItems={"center"}>
        <InputSearch />
        <Tooltip label="Add Blog" aria-label="A tooltip">
          <PlusSquare
            onClick={onOpen}
            className="mt-20 mb-10 text-gray-700"
            size={46}
          />
        </Tooltip>
      </HStack>
      <div className="mx-20 flex flex-wrap justify-between">
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
      <AddBlog isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
