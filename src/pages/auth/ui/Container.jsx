import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Logotype from "@/shared/assets/logo/logotype.svg?react";

const LogotypeWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    height: 120px;
    width: auto;
  }
  @media (min-width: 860px) {
    svg {
      height: clamp(160px, calc(-17.931px + 20.69vw), 280px);
      width: auto;
    }
  }
`;

const Title = styled.h2`
  color: #fff;
  font-size: clamp(4rem, -3.4138rem + 13.7931vw, 9rem);
  line-height: 80%;
  font-family: "Style Script", cursive;
  margin-block: 0;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-inline: 16px;
  height: 100vh;
  gap: 10px;
  flex: 1 1 auto;

  @media (min-width: 860px) {
    flex-direction: row;
    gap: 50px;
  }

  ${({ $styleWrapper }) => $styleWrapper};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  position: relative;
  padding: 20px;
  border: 1px solid #2f3336;

  border-radius: 16px;
  width: clamp(280px, calc(251.429px + 8.929vw), 380px);

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
      <LogotypeWrapper>
        <Logotype />
        <Title>Tereveni</Title>
      </LogotypeWrapper>
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
