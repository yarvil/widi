import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import verificationSchema from "../schemas/verificationSchema";
import {
  ContainerForm,
  Form,
  Input,
  Label,
  Button,
  ButtonClose,
  Legend,
} from "../ui";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchPost } from "../../../api/client";
import { useDispatch, useSelector } from "react-redux";
import { selectUserEmail } from "@/app/store/authentication/authSelectors";
import { showStatusMessage } from "@/app/store/authentication/authThunk";

const Text = styled.p`
  font-size: 14px;
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

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: {
      email: email || "",
      verificationCode: "",
    },
    validationSchema: verificationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await fetchPost(values, "api/auth/verify");
        console.log(data);
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
      <ContainerForm>
        <ButtonClose to="/auth" />
        <Legend>Верифікація</Legend>
        <Form onSubmit={handleSubmit}>
          <Text>
            На вашу електронну адресу <TextBold>{email}</TextBold>, надіслано
            код підтвердження, код підтвердження може затриматися, або потрапити
            до спаму
          </Text>
          <Label
            htmlFor="verificationCode"
            text="Введіть код підтвердження"
            isError={touched.verificationCode && errors.verificationCode}
          >
            <Input
              type="text"
              name="verificationCode"
              id="verificationCode"
              isError={touched.verificationCode && errors.verificationCode}
              errorMessage={errors.verificationCode}
              {...getFieldProps("verificationCode")}
            />
          </Label>
          <Button type="submit">Відправити</Button>
        </Form>
      </ContainerForm>
    </>
  );
}

export default LoginPage;
