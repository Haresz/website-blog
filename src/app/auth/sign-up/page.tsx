"use client";
import InputPassword from "@/components/InputPassword";
import InputText from "@/components/InputText";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";

export default function page() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Box
      mx={"auto"}
      my={20}
      p={10}
      maxW="md"
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Heading as="h2" size="xl">
        Register
      </Heading>
      <InputText label="Name" placeholder="Insert your name" />
      <InputText label="Email" placeholder="Insert your email" />
      <InputPassword label="Password" show={show} handleClick={handleClick} />
      <InputPassword
        label="Confirm Password"
        show={show}
        handleClick={handleClick}
      />
      <Button width={"100%"} mt={8} colorScheme="blue">
        Submit
      </Button>
    </Box>
  );
}
