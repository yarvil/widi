import styled from "styled-components";
export const ChatArea = styled.div`
  width: 140rem;
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  background: white;
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e4e6eb;
  background: white;
`;

export const ChatHeaderInfo = styled.div`
  margin-left: 12px;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  p {
    margin: 2px 0 0 0;
    font-size: 12px;
    color: #65676b;
  }
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f0f2f5;
`;

export const MessageWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${(props) => (props.isOwn ? "flex-end" : "flex-start")};
  margin-bottom: 12px;
`;

export const MessageBubble = styled.div`
  /* max-width: 60%; */
  padding: 10px 15px;
  border-radius: 18px;
  background: ${(props) => (props.isOwn ? "#1877f2" : "#e4e6eb")};
  color: ${(props) => (props.isOwn ? "white" : "black")};
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
`;

export const MessageTime = styled.div`
  font-size: 11px;
  color: #65676b;
  margin-top: 4px;
  text-align: ${(props) => (props.isOwn ? "right" : "left")};
`;

export const InputArea = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-top: 1px solid #e4e6eb;
  background: white;
  gap: 10px;
`;

export const MessageInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #e4e6eb;
  border-radius: 20px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #1877f2;
  }
`;

export const SendButton = styled.button`
  padding: 10px 20px;
  background: #1877f2;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #166fe5;
  }

  &:disabled {
    background: #e4e6eb;
    cursor: not-allowed;
  }
`;
