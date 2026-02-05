import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
`;

function Form({ children, ...props }) {
  return <FormStyled {...props}>{children}</FormStyled>;
}

Form.propTypes = {
  children: PropTypes.node,
};

export default Form;
