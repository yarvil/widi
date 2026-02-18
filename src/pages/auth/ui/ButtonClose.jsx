import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import CloseIcon from "@/shared/assets/icons/x-icon.svg?react";

const ButtonStyled = styled(NavLink)`
  display: flex;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    border-radius: 50%;
    background-color: #8282822e;
  }

  ${({ $style }) => $style};
`;

function ButtonClose({ type = "button", $style = "", to, ...props }) {
  return (
    <ButtonStyled type={type} to={to} $style={$style} {...props}>
      <CloseIcon />
    </ButtonStyled>
  );
}

ButtonClose.propTypes = {
  type: PropTypes.string,
  $style: PropTypes.string,
  to: PropTypes.string,
};

export default ButtonClose;
