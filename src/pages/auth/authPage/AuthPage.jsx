import React from "react";
import Logotype from "@/shared/assets/logo/logotype.svg?react";

import {
  PageWrapper,
  LogotypeWrapper,
  Title,
  ContainerForm,
  Button,
  ButtonLink,
  Legend,
  SubText,
  SubTitle,
  Img,
} from "../ui/AuthPage.styled";

function AuthPage() {
  function googleLogin() {
    window.location.href =
      "https://step-project-api.onrender.com/oauth2/authorization/google";
  }

  return (
    <PageWrapper>
      <LogotypeWrapper>
        <Logotype />
        <Title>Tereveni</Title>
      </LogotypeWrapper>
      <ContainerForm>
        <Legend>Потеревенимо?</Legend>
        <Button $primary onClick={googleLogin}>
          <Img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
          />
          Увійти через Google
        </Button>
        <SubText>або</SubText>
        <ButtonLink $primary to="/register">
          Зареєструватися
        </ButtonLink>
        <SubTitle>Вже зареєстровані?</SubTitle>
        <ButtonLink to="/login">Увійти</ButtonLink>
      </ContainerForm>
    </PageWrapper>
  );
}

export default AuthPage;
