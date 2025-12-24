import React from "react";
import styled from "styled-components";

const LegendStyled = styled.legend`
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: 500;
  text-shadow: 0 0 0.5em #646cffaa;
  letter-spacing: 1px;

  ${({ $style }) => $style};
`;

export default function Legend({ children, $style }) {
  return <LegendStyled $style={$style}>{children}</LegendStyled>;
}
