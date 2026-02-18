import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LegendStyled = styled.legend`
  margin-bottom: 10px;
  font-size: 26px;
  font-weight: 500;

  letter-spacing: 1px;

  span {
    text-transform: uppercase;
    font-weight: 300;
    font-size: 16px;
  }

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
