import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  border: 0;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #0f0f0f;
    filter: drop-shadow(0 0 0.5em #646cffaa);
  }

  &:active {
    background-color: #070606;
    filter: drop-shadow(0 0 0.5em #1922c8df);
  }

  ${({ $style }) => $style};
`;

export default function Button({
  children,
  type = "button",
  $style = "",
  ...props
}) {
  return (
    <ButtonStyled type={type} $style={$style} {...props}>
      {children}
    </ButtonStyled>
  );
}
