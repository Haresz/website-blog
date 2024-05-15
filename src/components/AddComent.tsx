import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { addComentsBlog } from "@/api/blog";
import InputText from "./InputText";

const comentSchema = Yup.object().shape({
  body: Yup.string().required("body is required"),
});

export default function AddComent(props: any) {
  const toast = useToast();
  const params = useParams();
  const storeUserData =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("userData")
      : null;
  const name = storeUserData ? JSON.parse(storeUserData).name : null;
  const email = storeUserData ? JSON.parse(storeUserData).email : null;

  const actionAddComent = async (values: any) => {
    try {
      const response = await addComentsBlog(
        parseInt(params.id as string),
        name,
        email,
        values.body
      );
      if (response.status === 201) {
        toast({
          title: "Coment added successfully",
          status: "success",
          position: "top",
          isClosable: true,
        });
        props.onClose();
        window.location.reload();
      } else {
        toast({
          title: "Coment added failed",
          status: "error",
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Coment added failed",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validationSchema: comentSchema,
    onSubmit: (values) => {
      actionAddComent(values);
      console.log(values);
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
                value={formik.values.body}
                onChange={formik.handleChange}
                label="body"
                placeholder="Insert your body"
                name="body"
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
