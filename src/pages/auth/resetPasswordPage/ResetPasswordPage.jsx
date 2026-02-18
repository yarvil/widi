import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { fetchPost } from "../sendRequest/index.js";
import resetPasswordSchema from "../schemas/resetPasswordSchema.js";
import {
  ContainerForm,
  Form,
  Input,
  Label,
  Button,
  ButtonClose,
  Legend,
} from "../ui";
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
    onSubmit: (values) => {
      try {
        fetchPost(values, "api/auth/reset-password");

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
      <ContainerForm>
        <ButtonClose to="/forgot-password">X</ButtonClose>
        <Legend>Зміна паролю</Legend>
        <Form onSubmit={handleSubmit}>
          <Label
            htmlFor="password"
            text="Пароль"
            isError={touched.password && errors.password}
          >
            <Input
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
              isError={touched.password && errors.password}
              errorMessage={errors.password}
              {...getFieldProps("password")}
            />
          </Label>
          <Label
            htmlFor="confirmPassword"
            text="Підтвердження паролю"
            isError={touched.confirmPassword && errors.confirmPassword}
          >
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="new-password"
              isError={touched.confirmPassword && errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              {...getFieldProps("confirmPassword")}
            />
          </Label>
          <Button type="submit" $style="margin-top: 5px;">
            Змінити пароль
          </Button>
        </Form>
      </ContainerForm>
    </>
  );
}

export default ResetPasswordPage;
