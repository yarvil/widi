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
    localStorage.setItem("token", JSON.stringify("token"));
    dispatch(
      showStatusMessage({ message: "Login successful!", type: "success" })
    );

    dispatch(login());
    navigate("/");
  }

  function loginPage() {
    navigate("/login");
  }

  return (
    <ContainerForm>
      <Legend>Вхід до "назвва"</Legend>
      <Button
        onClick={googleLogin}
        $style="display: flex; justify-content: center; align-items: center"
      >
        <Img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google logo"
        ></Img>
        Увійти через Google
      </Button>
      <Legend $style="width: 100%; display: flex; justify-content: center; align-items: center; margin-inline: 0;  &::before, &::after {content: ''; flex-grow: 1;  border-bottom: 1px solid rgb(83, 100, 113) ; } &::before { margin-right: 10px; } &::after { margin-left: 10px; }">
        або
      </Legend>
      <Button onClick={loginPage}>Увійти</Button>
      <p>
        Ще немає облікового запису?
        <NavLinkStyled to="/register" $style="margin-left: 5px;">
          Зареєструватися
        </NavLinkStyled>
      </p>
    </ContainerForm>
  );
}

export default AuthPage;
