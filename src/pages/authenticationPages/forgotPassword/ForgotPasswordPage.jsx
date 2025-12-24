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
import { fetchGet } from "../sendRecvest";
import { useDispatch } from "react-redux";
import { showStatusMessage } from "@/app/store/authentication/authThunk";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors, touched, handleSubmit, getFieldProps, resetForm } = useFormik(
    {
      initialValues: {
        email: "",
      },
      validationSchema,
      onSubmit: async (values) => {
        try {
          const data = await fetchGet();

          const currentUser = data.find((user) => user.email === values.email);
          if (!currentUser) {
            dispatch(
              showStatusMessage({ message: "Invalid email", type: "error" })
            );
            resetForm();
            return;
          }
          console.log("Дані користувача:", values);
          return navigate("/forgot-password/reset");
        } catch (error) {
          console.error("Error fetchGet:", error);
          throw error;
        }
      },
    }
  );

  return (
    <>
      <ContainerForm>
        <ButtonClose to="/signin" />
        <Legend>Forgot password</Legend>
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
