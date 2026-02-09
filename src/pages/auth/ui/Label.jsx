import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export const LabelStyled = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 5px;
  font-size: 16px;
  text-align: start;
  position: relative;
  flex: 1 1 auto;

  ${({ $style }) => $style};

  &:focus-within p {
    color: rgb(29, 155, 240);
    opacity: 1;
  }

  ${({ $isError }) =>
    $isError &&
    `
    &:focus-within p {
      color: red;
      opacity: 0.9;
    }

    p {
      color: red;
      opacity: 0.9;
    }
  `};
`;

const InputName = styled.p`
  padding-left: 5px;
  font-size: clamp(10px, 2.5vw, 12px);
  opacity: 0.5;
  margin: 0;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: color 0.3s ease;
`;

function Label(props) {
  const { text, children, $style = "", isError = false, ...restProps } = props;

  return (
    <LabelStyled $style={$style} $isError={isError} {...restProps}>
      <InputName $isError={isError}>{text}</InputName>
      {children}
    </LabelStyled>
  );
}

Label.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  $style: PropTypes.string,
  isError: PropTypes.bool,
};

export default Label;
