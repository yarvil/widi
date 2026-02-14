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
  background-color: rgba(0, 0, 0, 0.4);
  padding: 30px;
  box-sizing: border-box;
`;
export const Modal = styled.div`
  position: relative;
  overflow: hidden auto;
  border: 1px solid #2f3336;
  max-height: calc(-60px + 100vh);
  box-sizing: border-box;
  flex: 0 1 auto;
  max-width: 560px;
  width: 100%;
  padding: 40px;
  background-color: #000;
  border-radius: 10px;
`;
export const ModalContent = styled.div``;
export const CloseButton = styled.button`
  position: absolute;
  border: none;
  background-color: inherit;
  top: 0;
  right: 0;
  cursor: pointer;
`;
export const SubmitBtn = styled.button`
  background-color: #808080;
  color: #fff;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 10px;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
