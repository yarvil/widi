import styled from "styled-components"
import { Link } from "react-router-dom";


export const NotificationPostLink = styled(Link)`
  text-decoration: none;
  color: inherit; 
  padding:10px;
`;
export const IconWrapper = styled.button`
 position: relative;
  border:none;
  background: transparent;
  cursor: pointer;
  padding: 10px;

  width: fit-content;
  align-self: flex-end;
`
export const ReadAllText = styled.div`
 position: absolute;
  top: 50%;
  right: 120%;
  transform: translateY(-50%);
  background: #1f1f1f;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  white-space: nowrap;   
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  ${IconWrapper}:hover & {
    opacity: 1;
  }

`

export const NotificationsPost = styled.div`
  position: relative;

  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;

  padding: 16px;

  color: #f5f5f5;

  transition: all 0.25s ease;

  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  color: #9ca3af;
  font-size: 13px;
`;

export const Content = styled.p`
  font-size: 15px;
  margin-top: 6px;
  color: #ffffff;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;

  border: none;
  background: none;
  color: #9ca3af;
  cursor: pointer;

  transition: 0.2s;

  &:hover {
    color: #ffffff;
    transform: scale(1.1);
  }
`;
