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
import { NavLink, useNavigate } from "react-router-dom";
import { fetchGet } from "../sendRecvest";
import { useDispatch } from "react-redux";
import { login } from "@/app/store/authentication/authSlice";

const NavLinkStyled = styled(NavLink)`
  display: block;
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function SigninPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { errors, touched, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await fetchGet();

        const currentUser = data.find(
          (user) =>
            user.email === values.email && user.password === values.password
        );
        if (!currentUser) {
          alert("Invalid email or password!");
          return;
        }

        localStorage.setItem("token", JSON.stringify(currentUser.token));
        // console.log("Дані користувача:", currentUser);

        dispatch(login());
        navigate("/");
      } catch (error) {
        console.error("Error fetchGet:", error);
        throw error;
      }
    },
  });
  return (
    <>
      <ContainerForm>
        <ButtonClose to="/login">X</ButtonClose>
        <h1>Sign in</h1>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            isError={touched.email && errors.email}
            errorMessage={errors.email}
            {...getFieldProps("email")}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            isError={touched.password && errors.password}
            errorMessage={errors.password}
            {...getFieldProps("password")}
          />
          <Wrapper>
            <Input
              type="checkbox"
              name="remember"
              id="remember"
              $style="margin: 0;"
            />
            <Label htmlFor="remember" $style="flex-direction: row; ">
              Remember me
            </Label>
          </Wrapper>
          <NavLinkStyled to="/forgot-password">
            forgot your password?
          </NavLinkStyled>
          <Button type="submit">Submit</Button>
        </Form>
      </ContainerForm>
    </>
  );
}
