import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  margin-top: 20px;

  ${({ $styleWrapper }) => $styleWrapper};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 380px;
  overflow-y: auto;
  scrollbar-width: thin;

  @media (max-width: 768px) {
    max-height: 350px;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
    }
  }

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
