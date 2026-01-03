import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import forgotPasswordSchema from "../schemas/forgotPasswordSchema";
import {
  ContainerForm,
  Form,
  Input,
  Label,
  Button,
  ButtonClose,
  Legend,
} from "../ui";
import { fetchGet } from "../sendRequest";
import { useDispatch } from "react-redux";
import { showStatusMessage } from "@/app/store/authentication/authThunk";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors, touched, handleSubmit, getFieldProps, resetForm } = useFormik(
    {
      initialValues: {
        email: "",
      },
      validationSchema: forgotPasswordSchema,
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
        <ButtonClose to="/login" />
        <Legend>Забули пароль?</Legend>
        <Form onSubmit={handleSubmit}>
          <Label
            htmlFor="email"
            text="Пошта"
            $style="margin-bottom: 8px;"
            isError={touched.email && errors.email}
          >
            <Input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              isError={touched.email && errors.email}
              errorMessage={errors.email}
              {...getFieldProps("email")}
            />
          </Label>
          <Button type="submit" $style="margin-top: 5px;">
            Продовжити
          </Button>
        </Form>
      </ContainerForm>
    </>
  );
}

export default ForgotPasswordPage;
