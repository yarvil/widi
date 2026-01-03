import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SelectStyled = styled.select`
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: transparent;
  padding: 18px 10px 4px 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  max-height: 50px;
  overflow-y: scroll;
  scrollbar-width: thin;

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
