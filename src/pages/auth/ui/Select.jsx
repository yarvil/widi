import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SelectStyled = styled.select`
  border-radius: 4px;
  border: 2px solid #8282822e;
  background-color: transparent;
  color: white;
  width: 100%;
  flex: 1;
  padding: clamp(12px, 3vw, 18px) clamp(2px, 1vw, 8px) clamp(4px, 1vw, 8px)
    clamp(2px, 1vw, 8px);
  font-size: clamp(12px, 2.5vw, 16px);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 4px;
    border: 2px solid #ffffff;
  }

  &:focus {
    border: 2px solid rgb(29, 155, 240);
  }

  ${({ $isError }) =>
    $isError &&
    `
        border: 2px solid red;

        &:focus {
            border: 2px solid red;
        }
    `};

  ${({ $style = "" }) => $style};
`;

function Select({ isError = false, $style = "", children, ...props }) {
  return (
    <SelectStyled $isError={isError} $style={$style} {...props}>
      {children}
    </SelectStyled>
  );
}

Select.propTypes = {
  isError: PropTypes.bool,
  $style: PropTypes.string,
  children: PropTypes.node,
};

export default Select;
