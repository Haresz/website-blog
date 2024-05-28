"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { useUsers } from "@/hooks/useUsers";
import InputText from "@/components/ui/InputText";
import { setToken } from "@/utils/auth";

const loginSchema = Yup.object().shape({
  name: Yup.string().required("Input required"),
  email: Yup.string().required("Input required"),
});

export default function LoginPage() {
  const { users, loading } = useUsers();
  const toast = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => handleLogin(values),
  });

  const handleLogin = (values: { name: string; email: string }) => {
    const foundUser = users.find(
      (user: any) => user.name === values.name && user.email === values.email
    );
    if (!foundUser) {
      toast({
        title: "User not found",
        status: "error",
        position: "top",
        isClosable: true,
      });
      return;
    }

    sessionStorage.setItem("userData", JSON.stringify(foundUser));
    setToken();

    toast({
      title: "Login successful",
      status: "success",
      position: "top",
      isClosable: true,
    });

    router.push("/");
  };

  return (
    <Box
      mx="auto"
      my={[10, 20, 40]}
      p={[5, 10]}
      maxW={["90%", "80%", "md"]}
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        Login
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
          <div style={{ color: "red" }}>{formik.errors.name}</div>
        )}
        <InputText
          onChange={formik.handleChange}
          label="Email"
          placeholder="Insert your email"
          name="email"
          value={formik.values.email}
        />
        {formik.errors.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}
        <Button
          type="submit"
          width="100%"
          mt={8}
          colorScheme="blue"
          isLoading={loading}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
