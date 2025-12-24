import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import signupSchema from "../schemas/signupSchema";
import {
  ContainerForm,
  Form,
  Input,
  Label,
  Button,
  ButtonClose,
  Legend,
} from "../ui";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/app/store/authentication/authSlice";
import { showStatusMessage } from "@/app/store/authentication/authThunk";

export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      try {
        const { confirmPassword, ...user } = values;
        if (confirmPassword !== user.password) {
          dispatch(
            showStatusMessage({
              message: "Passwords do not match!",
              type: "error",
            })
          );
          setFieldValue("confirmPassword", "");
          setFieldValue("password", "");
          return;
        }

        console.log("Дані користувача:", user);
        dispatch(
          showStatusMessage({
            message: "Account created successfully!",
            type: "success",
          })
        );

        localStorage.setItem("token", JSON.stringify("token"));
        dispatch(login());
        navigate("/");
      } catch (error) {
        console.error("Error fetchGet:", error);
        throw error;
      }
    },
  });
  return (
    <>
      <ContainerForm>
        <ButtonClose to="/login" />
        <Legend>Registration</Legend>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="firstName"> First name </Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            isError={touched.firstName && errors.firstName}
            errorMessage={errors.firstName}
            {...getFieldProps("firstName")}
          />
          <Label htmlFor="lastName"> Last name </Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            isError={touched.lastName && errors.lastName}
            errorMessage={errors.lastName}
            {...getFieldProps("lastName")}
          />
          <Label htmlFor="email"> Email </Label>
          <Input
            type="email"
            name="email"
            id="email"
            isError={touched.email && errors.email}
            errorMessage={errors.email}
            {...getFieldProps("email")}
          />
          <Label htmlFor="birthDate"> Date of birth </Label>
          <Input
            type="date"
            name="birthDate"
            id="birthDate"
            isError={touched.birthDate && errors.birthDate}
            errorMessage={errors.birthDate}
            {...getFieldProps("birthDate")}
          />
          <Label htmlFor="password"> Password </Label>
          <Input
            type="password"
            name="password"
            id="password"
            isError={touched.password && errors.password}
            errorMessage={errors.password}
            {...getFieldProps("password")}
          />
          <Label htmlFor="confirmPassword"> Confirm Password </Label>
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            isError={touched.confirmPassword && errors.confirmPassword}
            errorMessage={errors.confirmPassword}
            {...getFieldProps("confirmPassword")}
          />
          <Button type="submit" $style="margin-top: 10px;">
            Submit
          </Button>
        </Form>
      </ContainerForm>
    </>
  );
}
