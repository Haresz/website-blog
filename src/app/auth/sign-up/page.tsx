"use client";
import InputText from "@/components/InputText";
import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import SelectGender from "@/components/SelectGender";
import { registerUser } from "@/api/user";
import { useRouter } from "next/navigation";

const userSchema = Yup.object().shape({
  name: Yup.string().required("input required"),
  email: Yup.string().required("input required"),
  gender: Yup.string().required("input required"),
});

export default function Page() {
  const toast = useToast();
  const router = useRouter();
  const actionGetComent = async (values: {
    name: string;
    email: string;
    gender: string;
  }) => {
    const response = await registerUser(
      values.name,
      values.email,
      values.gender
    );
    if (response.status != 201) {
      toast({
        title: `register failed`,
        status: "error",
        isClosable: true,
      });
    }
    toast({
      title: `register succesfully`,
      status: "success",
      isClosable: true,
    });
    router.push("/auth/sign-in");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
    },
    validationSchema: userSchema,
    onSubmit: (values, { resetForm }) => {
      actionGetComent(values);
      resetForm();
    },
  });

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
      <form onSubmit={formik.handleSubmit}>
        <InputText
          onChange={formik.handleChange}
          label="Name"
          placeholder="Insert your name"
          name="name"
          value={formik.values.name}
        />
        {formik.errors.name && (
          <div style={{ color: "red" }}>
            {JSON.stringify(formik.errors.name)}
          </div>
        )}

        <InputText
          onChange={formik.handleChange}
          label="Email"
          placeholder="Insert your email"
          name="email"
          value={formik.values.email}
        />
        {formik.errors.email && (
          <div style={{ color: "red" }}>
            {JSON.stringify(formik.errors.email)}
          </div>
        )}

        <SelectGender
          value={formik.values.gender}
          onChange={formik.handleChange}
        />
        {formik.errors.gender && (
          <div style={{ color: "red" }}>
            {JSON.stringify(formik.errors.gender)}
          </div>
        )}

        <Button type="submit" width={"100%"} mt={16} colorScheme="blue">
          Submit
        </Button>
      </form>
    </Box>
  );
}
