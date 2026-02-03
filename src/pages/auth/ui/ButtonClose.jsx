import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyled = styled(NavLink)`
  border: 0;
  border-radius: 10px;
  padding: 5px 14px;
  cursor: pointer;
  color: #fff;
  font-size: 20px;
  position: absolute;
  top: 10px;
  left: 10px;

  &:hover {
    border-radius: 100%;
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
      X
    </ButtonStyled>
  );
}

ButtonClose.propTypes = {
  type: PropTypes.string,
  $style: PropTypes.string,
  to: PropTypes.string,
};

export default ButtonClose;
