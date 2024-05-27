import { InputGroup, InputLeftElement, Input, Box } from "@chakra-ui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import React from "react";

export default function InputSearch({ searchQuery, setSearchQuery }: any) {
  return (
    <Box className="w-full sm:px-20 px-4 ">
      <InputGroup
        w={"100%"}
        className=" mt-10 mb-10 border-2 border-gray-400 rounded-lg"
      >
        <InputLeftElement
          pointerEvents="none"
          color="gray.500"
          fontSize="1.2em"
        >
          <MagnifyingGlass size={20} />
        </InputLeftElement>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search blogs"
        />
      </InputGroup>
    </Box>
  );
}
