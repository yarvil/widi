import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputStyled = styled.input`
  outline: none;
  border: 2px solid #8282822e;
  color: white;
  background-color: transparent;
  border-radius: 5px;
  padding: clamp(12px, 2.5vw, 20px) clamp(12px, 3vw, 20px) clamp(6px, 1vw, 8px)
    clamp(10px, 2.5vw, 14px);
  transition: all 0.3s ease;

  &[type="password"] {
    letter-spacing: 2px;
  }

  &:focus {
    border: 2px solid rgb(29, 155, 240);
  }

  ${({ $isError }) =>
    $isError &&
    `
    color: #d20d0d;
    border: 2px solid red;

    &:focus {
      border: 2px solid red;
    }
  `};

  ${({ $style = "" }) => $style};
`;

const Error = styled.span`
  color: red;
  font-size: clamp(12px, 3vw, 14px);
  letter-spacing: 1px;
  padding-left: 6px;
  transition: all 0.3s ease;
`;

function Input({
  type = "text",
  name = "",
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
        placeholder={placeholder}
        $style={$style}
        $isError={isError}
        {...props}
      />
      {isError && <Error>{errorMessage}</Error>}
    </>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  $style: PropTypes.string,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default Input;
