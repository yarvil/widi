import styled from "styled-components";
export const ModalWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(79, 79, 79, 0.4);
  padding: 30px;
  box-sizing: border-box;
`;
export const Modal = styled.div`
  position: relative;
  overflow: hidden auto;
  border: 1px solid #2f3336;
  width: 365px;
  max-width: 100%;
  padding: 30px;
  background-color: #000;
  border-radius: 16px;
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
export const CloseButton = styled.button`
  position: absolute;
  border: none;
  background-color: inherit;
  top: 10px;
  right: 5px;
  cursor: pointer;
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 32px;
  font-family: "Style Script", cursive;
  margin-block: 0;
`;

export const LogoType = styled.div`
  svg {
    height: 80px;
    width: auto;
  }
`;

export const LogoWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PrimaryButton = styled.div`
  border-radius: 9999px;
  color: ${(props) =>
    props.$danger ? "rgb(255, 255, 255)" : "rgb(15, 20, 25)"};
  background-color: ${(props) =>
    props.$danger ? "rgb(244, 33, 46)" : "rgb(239, 243, 244)"};
  border-color: transparent;
  padding: 16px 24px;
  cursor: pointer;
  margin-block: 0;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    background-color: ${(props) =>
      props.$danger ? "rgb(220, 30, 41)" : "rgb(239, 243, 244)"};
  }
`;
export const SecondaryButton = styled(PrimaryButton)`
  color: rgb(239, 243, 244);
  background-color: transparent;
  border: 1px solid rgb(83, 100, 113);
  margin-top: 0;
  margin-bottom: 0;

  &:hover {
    background-color: rgba(239, 243, 244, 0.1);
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
`;

export const ModalTitle = styled.h3`
  color: rgb(231, 233, 234);
  text-align: left;
  font-size: 20px;
  margin-block: 0 8px;
`;
export const ModalDesc = styled.p`
  color: rgb(113, 118, 123);
  text-align: left;
  font-size: 16px;
  margin-block: 0;
`;
