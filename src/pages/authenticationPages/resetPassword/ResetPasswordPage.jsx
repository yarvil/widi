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

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { errors, touched, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { confirmPassword, ...user } = values;
      if (confirmPassword !== user.password) {
        alert("Passwords do not match!");
        return;
      }
      alert("Password reset successfully!");
      return navigate("/signin");
    },
  });

  return (
    <>
      <ContainerForm>
        <ButtonClose to="/forgot-password">X</ButtonClose>
        <h1>Reset password</h1>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="password">New password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            isError={touched.password && errors.password}
            errorMessage={errors.password}
            {...getFieldProps("password")}
          />
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            isError={touched.confirmPassword && errors.confirmPassword}
            errorMessage={errors.confirmPassword}
            {...getFieldProps("confirmPassword")}
          />
          <Button type="submit" $style="margin-top: 5px;">
            Submit
          </Button>
        </Form>
      </ContainerForm>
    </>
  );
}
