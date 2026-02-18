import React from "react";
import { useFormik } from "formik";
import loginSchema from "../schemas/loginSchema";
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
import { NavigationLink, CheckBoxWrapper } from "../ui/LoginPage.styled";
import Logotype from "@/shared/assets/logo/logotype.svg?react";
import CloseIcon from "@/shared/assets/icons/x-icon.svg?react";
import { useNavigate } from "react-router-dom";
import { fetchPost } from "../../../api/client";
import { useDispatch, useSelector } from "react-redux";
import {
  setRemember,
  setUserEmail,
  checkAuth,
} from "@/app/store/authentication/authSlice";
import {
  selectUserEmail,
  selectRemember,
} from "@/app/store/authentication/authSelectors";
import { showStatusMessage } from "@/app/store/authentication/authThunk";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector(selectUserEmail);
  const remember = useSelector(selectRemember);

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
      password: "",
      remember: remember || false,
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await fetchPost(values, "api/auth/login");

        dispatch(setUserEmail(values.email));
        dispatch(setRemember(values.remember));

        if (values.remember === true) {
          localStorage.setItem("userEmail", values.email);
          localStorage.setItem("remember", "true");
        } else {
          localStorage.removeItem("userEmail");
          localStorage.removeItem("remember");
        }

        await dispatch(checkAuth());

        dispatch(
          showStatusMessage({
            message: "Login successful",
            type: "success",
          }),
        );

        navigate("/");
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
          <Legend>Вхід</Legend>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="email" $isError={touched.email && errors.email}>
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
            <Label
              htmlFor="password"
              $isError={touched.password && errors.password}
            >
              <InputName>Пароль</InputName>
              <Input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                $isError={touched.password && errors.password}
                {...getFieldProps("password")}
              />
              {touched.password && <InputError>{errors.password}</InputError>}
            </Label>
            <CheckBoxWrapper>
              <Label
                htmlFor="remember"
                $style="flex-direction: row; gap: 5px; "
              >
                <Input
                  type="checkbox"
                  name="rememberMe"
                  id="remember"
                  $style="accent-color: #0e9f34;"
                  checked={values.remember}
                  onChange={(e) => setFieldValue("remember", e.target.checked)}
                />
                Запам`ятати мене
              </Label>
            </CheckBoxWrapper>
            <NavigationLink to="/forgot-password">
              Забули пароль?
            </NavigationLink>
            <Button $primary type="submit" $style="margin-top: 5px;">
              Увійти
            </Button>
          </Form>
        </ContainerForm>
      </PageWrapper>
    </>
  );
}

export default LoginPage;
