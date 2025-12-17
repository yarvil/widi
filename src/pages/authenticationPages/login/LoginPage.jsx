import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ContainerForm, Button } from "../globalComponents";

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
  return (
    <ContainerForm>
      <h1>Login Page</h1>
      <Button $style="display: flex; justify-content: center; align-items: center">
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
