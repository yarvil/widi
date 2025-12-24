import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  selectStatusMessage,
  selectMessageType,
} from "@/app/store/authentication/authSelectors";

const messageVariants = {
  success: `
            background-color: #2e7d32;
        `,
  error: `
            background-color: #b71c1c;
        `,
};

const MessageContainer = styled.div`
  position: fixed;
  bottom: 50px;
  right: 0;
  z-index: 100;
  transition: all 0.3s ease-in-out;

  ${({ $type }) => messageVariants[$type]};
`;

const Message = styled.p`
  color: #fff;
  font-size: 14px;
  letter-spacing: 1px;
  padding: 10px 20px;
  text-align: center;
`;

const StatusMessage = () => {
  const message = useSelector(selectStatusMessage);
  const type = useSelector(selectMessageType);

  if (!message) {
    return null;
  }

  return (
    <MessageContainer $type={type}>
      <Message>{message}</Message>
    </MessageContainer>
  );
};

export default StatusMessage;
