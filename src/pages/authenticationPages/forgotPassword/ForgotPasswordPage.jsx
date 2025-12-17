import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import validationSchema from "./validationSchema";
import {
  ContainerForm,
  Form,
  Input,
  Label,
  Button,
  ButtonClose,
} from "../globalComponents";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { errors, touched, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Email:", values.email);
      console.log("Дані користувача:", values);
      return navigate("/forgot-password/reset");
    },
  });

  return (
    <>
      <ContainerForm>
        <ButtonClose to="/signin">X</ButtonClose>
        <h1>Forgot password</h1>
        <Form onSubmit={handleSubmit}>
          <Label
            htmlFor="email"
            $style="align-items: center; margin-bottom: 8px;"
          >
            Email
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            isError={touched.email && errors.email}
            errorMessage={errors.email}
            {...getFieldProps("email")}
          />
          <Button type="submit" $style="margin-top: 5px;">
            Submit
          </Button>
        </Form>
      </ContainerForm>
    </>
  );
}
