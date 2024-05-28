import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputText from "../ui/InputText";
import { addBlogs } from "@/api/blog";

const blogSchema = Yup.object().shape({
  user_id: Yup.number().required("User ID is required"),
  title: Yup.string()
    .required("Title is required")
    .max(200, "max 200 characters"),
  body: Yup.string()
    .required("Body is required")
    .max(500, "max 500 characters"),
});

export default function AddBlog(props: any) {
  const toast = useToast();
  const storedUserData =
    typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("userData")
      : null;
  const userId = storedUserData ? JSON.parse(storedUserData).id : null;

  const actionAddBlog = async (values: any, resetForm: any) => {
    try {
      const response = await addBlogs(
        values.user_id,
        values.title,
        values.body
      );
      if (response.status === 201) {
        toast({
          title: `Blog added successfully`,
          status: "success",
          position: "top",
          isClosable: true,
        });
        resetForm();
        props.onClose();
        props.refetchBlogs();
      } else {
        throw new Error("Failed to add blog");
      }
    } catch (error) {
      toast({
        title: `Failed to add blog`,
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      user_id: userId,
      title: "",
      body: "",
    },
    validationSchema: blogSchema,
    onSubmit: (values, { resetForm }) => {
      actionAddBlog(values, resetForm);
    },
  });

  return (
    <Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your blog</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody pb={6}>
            <FormControl>
              <InputText
                value={formik.values.title}
                onChange={formik.handleChange}
                label="Title"
                placeholder="Insert your title"
                name="title"
              />
              {formik.touched.title && formik.errors.title && (
                <div style={{ color: "red" }}>{formik.errors.title}</div>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Body</FormLabel>
              <Textarea
                value={formik.values.body}
                onChange={formik.handleChange}
                name="body"
                placeholder="Here is a sample "
                size="sm"
                resize="none"
              />
              {formik.touched.body && formik.errors.body && (
                <div style={{ color: "red" }}>{formik.errors.body}</div>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
