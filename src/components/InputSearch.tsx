import { CheckIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import React from "react";

export default function InputSearch() {
  return (
    <InputGroup
      w={"fit-content"}
      className="ml-20 mt-10 mb-10 border-2 border-gray-400 rounded-lg"
    >
      <InputLeftElement pointerEvents="none" color="gray.500" fontSize="1.2em">
        <MagnifyingGlass size={20} />
      </InputLeftElement>
      <Input placeholder="Enter amount" />
    </InputGroup>
  );
}
