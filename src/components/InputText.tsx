import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

export default function InputText(props: any) {
  return (
    <FormControl mt={8}>
      <FormLabel>{props.label}</FormLabel>
      <Input placeholder={props.placeholder} />
    </FormControl>
  );
}
