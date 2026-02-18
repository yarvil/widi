import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import forgotPasswordSchema from "../schemas/forgotPasswordSchema";
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
import { fetchPost } from "../sendRequest";
import { useDispatch } from "react-redux";
import { showStatusMessage } from "@/app/store/authentication/authThunk";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors, touched, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        await fetchPost(values, "api/auth/forgot-password");

        return navigate("/forgot-password/reset");
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
          <ButtonClose to="/login">
            <CloseIcon />
          </ButtonClose>
          <Legend>Забули пароль?</Legend>
          <Form onSubmit={handleSubmit}>
            <Label
              htmlFor="email"
              text="Пошта"
              $isError={touched.email && errors.email}
            >
              <InputName>Пошта</InputName>
              <Input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                $isError={touched.email && errors.email}
                {...getFieldProps("email")}
              />
              {touched.email && <InputError>{errors.email}</InputError>}
            </Label>
            <Button $primary type="submit" $style="margin-top: 10px;">
              Продовжити
            </Button>
          </Form>
        </ContainerForm>
      </PageWrapper>
    </>
  );
}

export default ForgotPasswordPage;
