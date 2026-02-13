import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 16px;
  gap: 12px;
  border-bottom: 1px solid #2f3336;
`;
export const FormContainer = styled.form`
  display: flex;
  padding: 0 16px;
  gap: 12px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
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

export const Actions = styled.div`
  display: flex;
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
`;
