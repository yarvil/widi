import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { ContainerForm, Button, Legend } from "../ui";
import { useDispatch } from "react-redux";
import { login } from "@/app/store/authentication/authSlice";
import { showStatusMessage } from "@/app/store/authentication/authThunk";

const NavLinkStyled = styled(NavLink)`
  display: inline-block;
  margin-top: 10px;
  background-color: #181818;
  color: #fff;
  padding: 5px 10px;
  border-radius: 10px;

  &:hover {
    color: #fff;
    background-color: #0f0f0f;
    filter: drop-shadow(0 0 0.5em #646cffaa);
  }

  &:active {
    background-color: #070606;
  }
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 100%;
`;

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function googleLogin() {
    localStorage.setItem("token", JSON.stringify("token"));
    dispatch(
      showStatusMessage({ message: "Login successful!", type: "success" })
    );

    dispatch(login());
    navigate("/");
  }

  return (
    <ContainerForm>
      <Legend>Login Page</Legend>
      <Button
        onClick={googleLogin}
        $style="display: flex; justify-content: center; align-items: center"
      >
        <Img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google logo"
        ></Img>
        Sing up Google
      </Button>
      <NavLinkStyled to="/signup">Create account</NavLinkStyled>
      <NavLinkStyled to="/signin">Sign in</NavLinkStyled>
    </ContainerForm>
  );
}
