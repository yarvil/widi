import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import verificationSchema from "../schemas/verificationSchema";
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
import { useNavigate } from "react-router-dom";
import { fetchPost } from "../sendRequest";
import { useDispatch, useSelector } from "react-redux";
import { selectUserEmail } from "@/app/store/authentication/authSelectors";
import { showStatusMessage } from "@/app/store/authentication/authThunk";

const Text = styled.p`
  font-size: clamp(14px, 2.4vw, 16px);
  margin: 0;
  margin-bottom: 20px;
`;
const TextBold = styled.span`
  font-weight: 600;
`;

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector(selectUserEmail);

  const { errors, touched, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      email: email || "",
      verificationCode: "",
    },
    validationSchema: verificationSchema,
    onSubmit: async (values) => {
      try {
        await fetchPost(values, "api/auth/verify");

        dispatch(
          showStatusMessage({
            message: "Підтвердження успішно!",
            type: "success",
          }),
        );

        return navigate("/");
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
          <ButtonClose to="/auth">
            <CloseIcon />
          </ButtonClose>
          <Legend>Верифікація</Legend>
          <Form onSubmit={handleSubmit}>
            <Text>
              На вашу електронну адресу{" "}
              <TextBold>{email || "Емейл не знайдено"}</TextBold>, надіслано код
              підтвердження, код підтвердження може затриматися, або потрапити
              до спаму
            </Text>
            <Label
              htmlFor="verificationCode"
              $isError={touched.verificationCode && errors.verificationCode}
            >
              <InputName>Код підтвердження</InputName>
              <Input
                type="text"
                name="verificationCode"
                id="verificationCode"
                $isError={touched.verificationCode && errors.verificationCode}
                {...getFieldProps("verificationCode")}
              />
              {touched.verificationCode && (
                <InputError>{errors.verificationCode} </InputError>
              )}
            </Label>
            <Button $primary type="submit">
              Відправити
            </Button>
          </Form>
        </ContainerForm>
      </PageWrapper>
    </>
  );
}

export default LoginPage;
