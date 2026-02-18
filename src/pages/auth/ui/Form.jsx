import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FormStyled = styled.form`
  display: flex;
  gap: 5px;
  flex-direction: column;
  padding-inline: 15px;
  margin-bottom: 10px;
`;

function Form({ children, ...props }) {
  return <FormStyled {...props}>{children}</FormStyled>;
}

Form.propTypes = {
  children: PropTypes.node,
};

export default Form;
