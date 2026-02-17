import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: ${(props) => (props.$isReply ? "0" : "16px 0px")};
  gap: 12px;
  border-bottom: 1px solid #2f3336;
`;

export const FormContainer = styled.form`
  display: flex;
  padding: 0 16px 10px 16px;
  gap: 12px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
`;

export const TextArea = styled.textarea`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  background: transparent;
  border: none;
  resize: none;
  color: #d9d9d9;
  outline: none;
  font-size: 20px;
  min-height: 40px;
  margin-top: 10px;
`;

export const MediaWrapper = styled.div`
  position: relative;
  margin-block: 10px;
  border-radius: 16px;
  border: 1px solid #2f3336;
  min-height: 60px;

  img {
    max-width: 100%;
    padding: 20px;
  }
`;

export const Actions = styled.div`
  padding-top: 10px;
  display: flex;
  border-top: ${(props) => (props.$isExpanded ? "1px solid #2f3336" : "none")};
  align-items: center;
  justify-content: ${(props) =>
    props.$isReply ? "flex-end" : "space-between"};
`;

export const Button = styled.button`
  border-radius: 36px;
  padding: 9px 16px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  border: transparent;
  background-color: rgb(239, 243, 244);
  transition: 0.2s;

  &:disabled {
    color: #000;
    opacity: 0.5;
    cursor: auto;
  }
  &:not(:disabled):hover {
    background-color: rgb(215, 219, 220);
  }
`;

export const ReplyingText = styled.p`
  font-size: 16px;
  color: rgb(113, 118, 123);
  margin-left: 88px;
  margin-block: 0;

  & span {
    color: rgb(29, 155, 240);
  }
`;

export const CharCounter = styled.span`
  color: ${(props) => (props.$warning ? "#ff6b6b" : "#71767b")};
  font-size: 15px;
`;

export const RightAction = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
