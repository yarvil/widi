import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LegendStyled = styled.legend`
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: 500;

  letter-spacing: 1px;

  ${({ $style }) => $style};
`;

function Legend({ children, $style }) {
  return <LegendStyled $style={$style}>{children}</LegendStyled>;
}

Legend.propTypes = {
  children: PropTypes.node,
  $style: PropTypes.string,
};

export default Legend;
