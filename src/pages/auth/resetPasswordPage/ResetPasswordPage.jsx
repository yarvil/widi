import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { fetchPost } from "../../../api/client.js";
import resetPasswordSchema from "../schemas/resetPasswordSchema.js";
import {
  PageWrapper,
  LogotypeWrapper,
  Title,
  ContainerForm,
  Form,
  Input,
  InputName,
  InputError,
  Label,
  Button,
  ButtonClose,
  Legend,
} from "../ui/AuthPage.styled";
import Logotype from "@/shared/assets/logo/logotype.svg?react";
import CloseIcon from "@/shared/assets/icons/x-icon.svg?react";

import { useDispatch } from "react-redux";
import { showStatusMessage } from "@/app/store/authentication/authThunk";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors, touched, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      try {
        await fetchPost(values, "api/auth/reset-password");

        dispatch(
          showStatusMessage({
            message: "Пароль успішно змінено!",
            type: "success",
          }),
        );

        return navigate("/login");
      } catch (error) {
        dispatch(
          showStatusMessage({
            error: error,
          }),
        );
      }
    },
  });

  return (
    <>
      <PageWrapper>
        <LogotypeWrapper>
          <Logotype />
          <Title>Tereveni</Title>
        </LogotypeWrapper>
        <ContainerForm>
          <ButtonClose to="/forgot-password">
            <CloseIcon />
          </ButtonClose>
          <Legend>Зміна паролю</Legend>
          <Form onSubmit={handleSubmit}>
            <Label
              htmlFor="password"
              $isError={touched.password && errors.password}
            >
              <InputName>Пароль</InputName>
              <Input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                $isError={touched.password && errors.password}
                {...getFieldProps("password")}
              />
              {touched.password && <InputError>{errors.password}</InputError>}
            </Label>

            <Label
              htmlFor="confirmPassword"
              $isError={touched.confirmPassword && errors.confirmPassword}
            >
              <InputName>Підтвердження паролю</InputName>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="new-password"
                $isError={touched.confirmPassword && errors.confirmPassword}
                {...getFieldProps("confirmPassword")}
              />
              {touched.confirmPassword && (
                <InputError>{errors.confirmPassword}</InputError>
              )}
            </Label>

            <Button $primary type="submit">
              Змінити
            </Button>
          </Form>
        </ContainerForm>
      </PageWrapper>
    </>
  );
}

export default ResetPasswordPage;
