import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const OptionStyled = styled.option`
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: black;
  padding: 10px;
  cursor: pointer;
  max-height: 50px;
  overflow-y: scroll;
  scrollbar-width: thin;

  ${({ $style = "" }) => $style};
`;

function Option({ $style = "", value, children, disabled, ...props }) {
  return (
    <OptionStyled $style={$style} value={value} disabled={disabled} {...props}>
      {children}
    </OptionStyled>
  );
}

Option.propTypes = {
  $style: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export default Option;
