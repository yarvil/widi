import React from "react";
import styled from "styled-components";
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

export default function SignupPage() {
  const { errors, touched, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
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
      console.log("Дані користувача:", user);
      alert("Account created successfully!");
    },
  });
  return (
    <>
      <ContainerForm>
        <ButtonClose to="/login">X</ButtonClose>
        <h1>Registration</h1>
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
