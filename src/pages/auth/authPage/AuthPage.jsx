import React from "react";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ContainerForm, Button, Legend } from "../ui";
import { useDispatch } from "react-redux";

const SubTitle = styled.h2`
  margin-block: 30px 10px;
  color: rgb(239, 243, 244);
  font-size: 16px;
`;

const LinkButton = styled(Link)`
  color: rgb(15, 20, 25);
  border-radius: 9999px;
  padding: 10px 20px;
  background-color: rgb(239, 243, 244);
  font-weight: 500;

  &:hover {
    background-color: rgb(215, 219, 220);
  }
`;

const NavLinkStyled = styled(NavLink)`
  display: inline-block;
  margin-top: 10px;
  color: #1e9ee3;

  &:hover {
    color: #1169c7;
  }

  &:active {
    color: #0f39a1;
  }

  ${({ $style }) => $style};
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 100%;
`;

function AuthPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function googleLogin() {
    window.location.href =
      "https://step-project-api.onrender.com/oauth2/authorization/google";
  }

  function loginPage() {
    navigate("/login");
  }

  return (
    <ContainerForm>
      <Legend>Потеревенимо?</Legend>
      <Button
        $primary
        onClick={googleLogin}
        $style="display: flex; justify-content: center; align-items: center; margin-bottom: 10px"
      >
        <Img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google logo"
        />
        Увійти через Google
      </Button>
      <Legend $style="width: 100%; display: flex; justify-content: center; align-items: center; margin-inline: 0;  &::before, &::after {content: ''; flex-grow: 1;  border-bottom: 1px solid rgb(47, 51, 54) ; } &::before { margin-right: 10px; } &::after { margin-left: 10px; }">
        <span>або</span>
      </Legend>
      <LinkButton to="/register">Зареєструватися</LinkButton>
      <SubTitle>Вже зареєстровані?</SubTitle>
      <Button onClick={loginPage}>Увійти</Button>
    </ContainerForm>
  );
}

export default AuthPage;
