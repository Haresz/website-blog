import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React from "react";

export default function InputPassword(props: any) {
  return (
    <FormControl mt={8}>
      <FormLabel>{props.label}</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={props.show ? "text" : "password"}
          placeholder="Enter password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={props.handleClick}>
            {props.show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}
