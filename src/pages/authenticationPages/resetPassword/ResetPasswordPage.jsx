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
  Legend,
} from "../globalComponents";
import { useDispatch } from "react-redux";
import { showStatusMessage } from "@/app/store/authentication/authThunk";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors, touched, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { confirmPassword, ...user } = values;
      if (confirmPassword !== user.password) {
        dispatch(
          showStatusMessage({
            message: "Passwords do not match!",
            type: "error",
          })
        );
        resetForm();
        return;
      }

      dispatch(
        showStatusMessage({
          message: "Password reset successfully!",
          type: "success",
        })
      );

      return navigate("/signin");
    },
  });

  return (
    <>
      <ContainerForm>
        <ButtonClose to="/forgot-password">X</ButtonClose>
        <Legend>Reset password</Legend>
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
