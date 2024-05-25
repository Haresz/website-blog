import { Box, FormLabel, Select } from "@chakra-ui/react";
import React from "react";

export default function SelectGender(props: any) {
  return (
    <Box mt={8}>
      <FormLabel>Gender</FormLabel>
      <Select
        name="gender"
        onChange={props.onChange}
        placeholder="Select option"
        value={props.value}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </Select>
    </Box>
  );
}
