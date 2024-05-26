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
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputText from "../ui/InputText";
import { updateBlogs } from "@/api/blog";

const blogSchema = Yup.object().shape({
  title: Yup.string().required("input required"),
  body: Yup.string().required("input required"),
});

export default function EditBlog(props: any) {
  const toast = useToast();
  const storedUserData: any =
    typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("userData")
      : null;
  const userId = storedUserData ? JSON.parse(storedUserData).id : "";

  useEffect(() => {
    formik.setValues({
      title: props.blog ? props.blog.title : "",
      body: props.blog ? props.blog.body : "",
    });
  }, [props.blog]);

  const actionEditBlog = async (values: { title: string; body: string }) => {
    const response = await updateBlogs(
      props.blog.id,
      values.title,
      values.body
    );
    if (response.status != 200) {
      toast({
        title: `edit blog failed`,
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
    toast({
      title: `edit blog succesfully`,
      status: "success",
      position: "top",
      isClosable: true,
    });
    props.onClose();
    props.refetchBlogs();
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: blogSchema,
    onSubmit: (values: any) => {
      actionEditBlog(values);
    },
  });

  return (
    <Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit your blog</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody pb={6}>
            <FormControl>
              <InputText
                {...formik.getFieldProps("title")}
                label="Title"
                placeholder="Insert your title"
                name="title"
              />
              {formik.errors.title && (
                <div style={{ color: "red" }}>
                  {JSON.stringify(formik.errors.title)}
                </div>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Body</FormLabel>
              <Textarea
                {...formik.getFieldProps("body")}
                name="body"
                placeholder="Here is a sample "
                size="sm"
                resize={"none"}
              />
              {formik.errors.body && (
                <div style={{ color: "red" }}>
                  {JSON.stringify(formik.errors.body)}
                </div>
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
