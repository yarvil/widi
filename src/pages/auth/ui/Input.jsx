import React from "react";
import styled from "styled-components";

const InputStyled = styled.input`
  border: 0;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px 20px;

  &:hover {
    filter: drop-shadow(0 0 0.5em #3039e7aa);
  }

  &:focus {
    filter: drop-shadow(0 0 1em #646cffaa);
  }

  ${({ $style = "" }) => $style};
`;

const Error = styled.span`
  color: red;
  font-size: 14px;
  letter-spacing: 1px;
`;

export default function Input({
  type = "text",
  name = "",
  // value = "",
  placeholder = "",
  $style = "",
  isError = false,
  errorMessage = "",
  ...props
}) {
  return (
    <>
      <InputStyled
        type={type}
        name={name}
        // value={value}
        placeholder={placeholder}
        $style={$style}
        {...props}
      />
      {isError && <Error>{errorMessage}</Error>}
    </>
  );
}
