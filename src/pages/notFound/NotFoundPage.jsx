import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";

const NavLinkStyled = styled(NavLink)`
  display: block;
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  text-align: center;
  color: #fff;
  font-size: 40px;
  margin-bottom: 10px;
`;

const Text = styled.p`
  text-align: start;
  color: #fff;
  font-size: 18px;
  text-align: center;
`;

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <Title>404</Title>
      <Text>Page not found</Text>
      <NavLinkStyled to="/" onClick={() => navigate("/")}>
        Back to main page
      </NavLinkStyled>
    </>
  );
}
