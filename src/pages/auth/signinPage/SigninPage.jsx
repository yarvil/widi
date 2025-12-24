import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import signinSchema from "../schemas/signinSchema";
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
import { fetchGet } from "../sendRequest";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
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

  const email = useSelector(selectUserEmail);
  const remember = useSelector(selectRemember);

  console.log(remember);

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
    validationSchema: signinSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await fetchGet();

        const currentUser = data.find(
          (user) =>
            user.email === values.email && user.password === values.password
        );
        if (!currentUser) {
          dispatch(
            showStatusMessage({
              message: "Invalid email or password",
              type: "error",
            })
          );
          resetForm();
          return;
        }

        if (values.remember === true) {
          localStorage.setItem("userEmail", values.email);
          localStorage.setItem("remember", "true");
          dispatch(setUserEmail(values.email));
          dispatch(setRemember(true));
        } else {
          localStorage.removeItem("userEmail");
          localStorage.removeItem("remember");
          dispatch(setUserEmail(""));
          dispatch(setRemember(false));
        }

        localStorage.setItem("token", JSON.stringify(currentUser.token));

        dispatch(
          showStatusMessage({
            message: "Login successful",
            type: "success",
          })
        );

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
        <ButtonClose to="/login" />
        <Legend>Sign in</Legend>
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
              $style="margin: 0; 
              "
              checked={values.remember}
              onChange={(e) => setFieldValue("remember", e.target.checked)}
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
