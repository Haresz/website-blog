import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, FormControl, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { addComentsBlog } from "@/api/blog";
import InputText from "../ui/InputText";

const comentSchema = Yup.object().shape({
  body: Yup.string().required("body is required"),
});

export default function AddComent(props: any) {
  const toast = useToast();
  const params = useParams();
  const storeUserData =
    typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("userData")
      : null;
  const name = storeUserData ? JSON.parse(storeUserData).name : null;
  const email = storeUserData ? JSON.parse(storeUserData).email : null;

  const actionAddComent = async (values: any, resetForm: any) => {
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
        props.refetchComments();
        resetForm();
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
    onSubmit: (values, { resetForm }) => {
      actionAddComent(values, resetForm);
    },
  });
  return (
    <Box className="w-full">
      <form
        className="w-full flex flex-row items-center"
        onSubmit={formik.handleSubmit}
      >
        <FormControl>
          <InputText
            value={formik.values.body}
            onChange={formik.handleChange}
            placeholder="Insert your body"
            name="body"
          />
          {formik.touched.body && formik.errors.body && (
            <div style={{ color: "red" }}>{formik.errors.body}</div>
          )}
        </FormControl>
        <Button type="submit" colorScheme="blue" mr={3} mt={8} borderRadius={0}>
          Save
        </Button>
      </form>
    </Box>
  );
}
