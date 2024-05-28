"use client";
import InputText from "@/components/ui/InputText";
import { Box, Button, Heading, useToast, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import SelectGender from "@/components/ui/SelectGender";
import { getDataUser, registerUser } from "@/api/user";
import { useRouter } from "next/navigation";
import Link from "next/link";

const userSchema = Yup.object().shape({
  name: Yup.string().required("input required"),
  email: Yup.string().required("input required"),
  gender: Yup.string().required("input required"),
});

export default function Page() {
  const [users, setUsers] = useState([]);
  const toast = useToast();
  const router = useRouter();

  const getUser = async () => {
    try {
      const response = await getDataUser();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  const actionRegister = async (values: any) => {
    try {
      const foundUser: any = users.find(
        (user: any) => user.email === values.email
      );
      if (foundUser) {
        toast({
          title: "Email already registered",
          position: "top",
          status: "error",
          isClosable: true,
        });
      } else {
        const response: any = await registerUser(
          values.name,
          values.email,
          values.gender
        );
        if (response.status === 201) {
          toast({
            title: "Registration successful",
            position: "top",
            status: "success",
            isClosable: true,
          });
          router.push("/auth/sign-in");
        } else {
          toast({
            title: "Registration failed",
            description: response.data.message || "Unknown error occurred",
            position: "top",
            status: "error",
            isClosable: true,
          });
        }
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again later.",
        position: "top",
        status: "error",
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
    },
    validationSchema: userSchema,
    onSubmit: (values, { resetForm }) => {
      actionRegister(values);
      resetForm();
    },
  });

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
          <Box style={{ color: "red" }}>{formik.errors.name}</Box>
        )}
        <InputText
          onChange={formik.handleChange}
          label="Email"
          placeholder="Insert your email"
          name="email"
          value={formik.values.email}
        />
        {formik.errors.email && (
          <Box style={{ color: "red" }}>{formik.errors.email}</Box>
        )}
        <SelectGender
          value={formik.values.gender}
          onChange={formik.handleChange}
        />
        {formik.errors.gender && (
          <Box style={{ color: "red" }}>{formik.errors.gender}</Box>
        )}
        <Button type="submit" width="100%" mt={8} mb={4} colorScheme="blue">
          Submit
        </Button>
      </form>
      <Text fontSize={"sm"}>
        Any have a account{" "}
        <Link
          className=" font-bold underline text-blue-700"
          href={"/auth/sign-in"}
        >
          Login
        </Link>
      </Text>
    </Box>
  );
}
