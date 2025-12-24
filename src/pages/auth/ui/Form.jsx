import React from "react";
import styled from "styled-components";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
`;

export default function Form({ children, ...props }) {
  return <FormStyled {...props}>{children}</FormStyled>;
}
