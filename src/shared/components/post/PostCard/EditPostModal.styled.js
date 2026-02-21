import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: #000;
  border: 1px solid #2f3336;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #2f3336;
  gap: 24px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #e7e9ea;
  display: flex;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    border-radius: 50%;
    background-color: #8282822e;
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
`;

export const Content = styled.div`
  padding: 16px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  background: transparent;
  border: none;
  resize: none;
  color: #d9d9d9;
  outline: none;
  font-size: 20px;
  min-height: 120px;
  font-family: inherit;
  margin-bottom: 12px;
`;

export const MediaActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #2f3336;
`;

export const MediaWrapper = styled.div`
  position: relative;
  margin-block: 10px;
  border-radius: 16px;
  border: 1px solid #2f3336;
  min-height: 60px;
`;
