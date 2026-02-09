import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline: 16px;
  height: 100vh;

  ${({ $styleWrapper }) => $styleWrapper};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  /* position: absolute; */
  padding: 20px;
  border: 1px solid #ccc;

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
