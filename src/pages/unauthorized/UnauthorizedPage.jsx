import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import errorImage from "./403-error.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  margin: 0 auto;
`;

const NavLinkStyled = styled(NavLink)`
  display: block;
  font-size: clamp(16px, 3vw, 25px);
  margin-top: 5px;
  margin-bottom: 10px;
  color: #1e9ee3;

  &:hover {
    color: #1169c7;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #fff;
  font-size: clamp(18px, 4vw, 30px);
  margin-bottom: 10px;
  letter-spacing: 1px;
  width: 70%;
`;

const Image = styled.img`
  width: clamp(250px, 60vw, 600px);
  height: auto;
  font-size: clamp(40px, 8vw, 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Image src={errorImage} alt="404" />
        <Title>You don’t have permission to view this page</Title>
        <NavLinkStyled to="/auth" onClick={() => navigate("/")}>
          Go to authentication page
        </NavLinkStyled>
      </Container>
    </>
  );
}
