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
  width: 300px;
  max-width: 100%;
  padding: 40px;
  background-color: #000;
  border-radius: 10px;
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
