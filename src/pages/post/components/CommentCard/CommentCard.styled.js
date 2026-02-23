import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
`;

export const Content = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 4px;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 360px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
`;

export const AuthorName = styled(Link)`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: rgb(231, 233, 234);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 1;

  @media (max-width: 360px) {
    flex-shrink: 0;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const SecondaryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  overflow: hidden;
  flex-shrink: 1;
`;

export const AuthorNickname = styled.span`
  color: #6e767d;
  font-size: 15px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 1;
  min-width: 0;
`;

export const Text = styled.p`
  color: rgb(231, 233, 234);
  margin: 0;
  font-size: 15px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
`;
