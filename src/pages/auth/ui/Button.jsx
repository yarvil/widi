import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonStyled = styled.button`
  border: 0;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  color: #0f0f0f;
  background-color: #ffffff;
  font-weight: 500;

  &:hover {
    background-color: #fafafaa0;
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
