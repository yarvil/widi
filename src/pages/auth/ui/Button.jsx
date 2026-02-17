import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonStyled = styled.button`
  border: 0;
  border-radius: 9999px;
  border: ${(props) =>
    props.$primary ? "transparent" : "1px solid rgb(83, 100, 113)"};
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$primary ? "rgb(239, 243, 244)" : "transparent"};
  color: ${(props) =>
    props.$primary ? "rgb(15, 20, 25)" : "rgb(239, 243, 244)"};
  font-weight: 500;

  &:hover {
    background-color: ${(props) =>
      props.$primary ? "rgb(215, 219, 220)" : "rgba(239, 243, 244, 0.1)"};
  }

  &:active {
    background-color: #ffffff79;
  }

  ${({ $style }) => $style};
`;

function Button({ children, type = "button", $style = "", ...props }) {
  return (
    <ButtonStyled type={type} $style={$style} {...props}>
      {children}
    </ButtonStyled>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  $style: PropTypes.string,
};

export default Button;
