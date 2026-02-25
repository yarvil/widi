import styled from "styled-components";

export const EditContainer = styled.div`
  position: relative;
`;

export const HeaderImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

export const HeaderImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.$hasImage
      ? `url(${props.$imageUrl})`
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const HeaderImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  cursor: pointer;

  ${HeaderImageWrapper}:hover & {
    opacity: 1;
  }
`;

export const AvatarWrapper = styled.div`
  position: absolute;
  top: 140px;
  left: 16px;
`;

export const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #000;
  background: ${(props) =>
    props.$hasImage
      ? `url(${props.$imageUrl})`
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
`;

export const AvatarInitials = styled.span`
  position: absolute;
  z-index: 1;
`;

export const AvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  cursor: pointer;

  ${AvatarWrapper}:hover & {
    opacity: 1;
  }
`;

export const FormContainer = styled.div`
  padding: 80px 16px 16px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  color: rgb(231, 233, 234);
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
  cursor: pointer;
`;

export const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const CharCounter = styled.span`
  font-size: 13px;
  color: rgb(113, 118, 123);
  font-weight: 400;
`;

export const InputWrapper = styled.div`
  width: 100%;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #2f3336;
`;

export const CancelButton = styled.button`
  border-radius: 9999px;
  padding: 9px 16px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid rgb(83, 100, 113);
  background-color: transparent;
  color: rgb(239, 243, 244);
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(239, 243, 244, 0.1);
  }
`;

export const SaveButton = styled.button`
  border-radius: 9999px;
  padding: 9px 16px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  border: transparent;
  background-color: ${(props) =>
    props.$primary ? "rgb(239, 243, 244)" : "transparent"};
  color: ${(props) =>
    props.$primary ? "rgb(15, 20, 25)" : "rgb(239, 243, 244)"};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$primary ? "rgb(215, 219, 220)" : "rgba(239, 243, 244, 0.1)"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const BioTextarea = styled.textarea`
  outline: none;
  border: 2px solid #8282822e;
  color: white;
  background-color: transparent;
  border-radius: 5px;
  padding: 12px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 15px;
  resize: none;
  transition: all 0.3s ease;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;

  &:focus {
    border: 2px solid rgb(29, 155, 240);
  }

  ${({ $isError }) =>
    $isError &&
    `
    color: #d20d0d;
    border: 2px solid red;

    &:focus {
      border: 2px solid red;
    }
  `};

  @media (max-width: 768px) {
    min-height: 160px;
  }
`;
