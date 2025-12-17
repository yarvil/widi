import React from "react";
import styled from "styled-components";

export const LabelStyled = styled.label`
  display: flex;
  flex-direction: column;
  margin: 3px;
  font-size: 20px;
  text-align: start;
  padding-left: 5px;

  ${({ $style }) => $style};
`;

export default function Label({ children, $style = "", ...props }) {
  return (
    <LabelStyled $style={$style} {...props}>
      {children}
    </LabelStyled>
  );
}
