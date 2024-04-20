"use client";
import { getDataUser } from "@/api/user";
import InputText from "@/components/InputText";
import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { actionGetUser } from "@/lib/features/userSlice";

const loginSchema = Yup.object().shape({
  name: Yup.string().required("input required"),
  email: Yup.string().required("input required"),
});

export default function page() {
  const [users, setUsers] = useState([]);
  const toast = useToast();
  const router = useRouter();
  const user: any = useAppSelector((state: RootState) => state.userSlice.user);
  const store = useAppStore();
  const initialized = useRef(false);

  console.log(users);

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

  const handleLogin = (values: { name: string; email: string }) => {
    const foundUser: any = users.find(
      (user: any) => user.name === values.name && user.email === values.email
    );
    if (!foundUser) {
      toast({
        title: `User not found`,
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (!initialized.current) {
      store.dispatch(actionGetUser(foundUser.id));
      initialized.current = true;
    }

    localStorage.setItem("userData", JSON.stringify(foundUser));

    toast({
      title: `Login successful`,
      status: "success",
      isClosable: true,
    });

    // Set token in cookie
    const inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);
    Cookies.set("token", uuidv4(), { expires: inThirtyMinutes });

    // Redirect user to home page
    router.push("/");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <Box
      mx={"auto"}
      my={40}
      p={10}
      maxW="md"
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Heading as="h2" size="xl">
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

        <Button type="submit" width={"100%"} mt={16} colorScheme="blue">
          Submit
        </Button>
      </form>
    </Box>
  );
}
