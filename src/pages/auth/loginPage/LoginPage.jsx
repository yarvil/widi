import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import loginSchema from "../schemas/loginSchema";
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
import { fetchPost } from "../sendRequest";
import { useDispatch, useSelector } from "react-redux";
import {
  setRemember,
  setUserEmail,
} from "@/app/store/authentication/authSlice";
import {
  selectUserEmail,
  selectRemember,
} from "@/app/store/authentication/authSelectors";
import { showStatusMessage } from "@/app/store/authentication/authThunk";

const NavLinkStyled = styled(NavLink)`
  display: block;
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #1e9ee3;

  &:hover {
    color: #1169c7;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

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
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await fetchPost(values, "api/auth/login");
        console.log(data);

        dispatch(setUserEmail(values.email));
        dispatch(setRemember(values.remember));

        if (values.remember === true) {
          localStorage.setItem("userEmail", values.email);
          localStorage.setItem("remember", "true");
        } else {
          localStorage.removeItem("userEmail");
          localStorage.removeItem("remember");
        }

        // localStorage.setItem("token", JSON.stringify(currentUser.token));

        // dispatch(
        //   showStatusMessage({
        //     message: "Login successful",
        //     type: "success",
        //   })
        // );

        // dispatch(login());
        // navigate("/");
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
        <Legend>Вхід до "назва"</Legend>
        <Form onSubmit={handleSubmit}>
          <Label
            htmlFor="email"
            text="Пошта"
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
          <Label
            htmlFor="password"
            text="Пароль"
            isError={touched.password && errors.password}
          >
            <Input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              isError={touched.password && errors.password}
              errorMessage={errors.password}
              {...getFieldProps("password")}
            />
          </Label>
          <Wrapper>
            <Label htmlFor="remember" $style="flex-direction: row; gap: 5px; ">
              <Input
                type="checkbox"
                name="rememberMe"
                id="remember"
                $style="margin: 0; accent-color: #0e9f34; 
              "
                checked={values.remember}
                onChange={(e) => setFieldValue("remember", e.target.checked)}
              />
              Запам'ятати мене
            </Label>
          </Wrapper>
          <NavLinkStyled to="/forgot-password">Забули пароль?</NavLinkStyled>
          <Button type="submit">Увійти</Button>
        </Form>
      </ContainerForm>
    </>
  );
}

export default LoginPage;
