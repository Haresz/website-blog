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
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <FormControl mt={8}>
      <FormLabel>{props.label}</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          name={props.name}
          onChange={props.onChange}
          value={props.value}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}
