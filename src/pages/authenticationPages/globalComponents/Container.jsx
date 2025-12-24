import React from "react";
import styled from "styled-components";

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
  width: 450px;

  ${({ $styleContainer }) => $styleContainer};
`;

export default function ContainerForm({
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
