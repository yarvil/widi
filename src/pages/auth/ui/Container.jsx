import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 20px;

  ${({ $styleWrapper }) => $styleWrapper};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: absolute;
  transform:translateY(-50%);
  padding: 20px;
  border: 1px solid #ccc;
  top:50%;

  border-radius: 10px;
  width: 380px;

  ${({ $styleContainer }) => $styleContainer};
`;
function ContainerForm({
  children,
  $styleWrapper = "",
  $styleContainer = "",
  ...props
}) {
  return (
    <Wrapper $styleWrapper={$styleWrapper}>
      <Container $styleContainer={$styleContainer}>{children}</Container>
    </Wrapper>
  );
}

ContainerForm.propTypes = {
  children: PropTypes.node,
  $styleWrapper: PropTypes.string,
  $styleContainer: PropTypes.string,
};

export default ContainerForm;
