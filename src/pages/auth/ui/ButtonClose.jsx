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
  color: #fff;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    border-radius: 50%;
    color: rgba(255, 254, 254, 0.589);
    background-color: #8282822e;
  }

  &:active {
    color: rgba(255, 255, 255, 0.198);
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
