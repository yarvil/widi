import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

export const AuthorName = styled(Link)`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: rgb(231, 233, 234);

  &:hover {
    text-decoration: underline;
  }
`;

export const AuthorNickname = styled.span`
  color: #6e767d;
  font-size: 15px;
`;

export const Text = styled.p`
  color: rgb(231, 233, 234);
  margin: 0;
  font-size: 15px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
`;
