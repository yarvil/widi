import { Link } from "react-router-dom";
import styled from "styled-components";

export const PostHeader = styled.div`
  display: flex;
  align-items: ${(props) => (props.$fullPost ? "start" : "center")};
  justify-content: space-between;
  padding-top: ${(props) => (props.$fullPost ? "0" : "12px")};
  gap: ${(props) => (props.$fullPost ? "12px" : "4px")};
  min-width: 0;
`;

export const AuthorWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$fullPost ? "column" : "row")};
  gap: ${(props) => (props.$fullPost ? "2px" : "5px")};
  flex: 1;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 360px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
`;

export const NameWrapper = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
  flex-shrink: 1;
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
  margin-bottom: 5px;
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

export const PostContent = styled.p`
  margin-block: 0 5px;
  font-size: 16px;
  color: rgb(231, 233, 234);
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const MediaWrapper = styled.div`
  margin-block: 0 6px;
  overflow: hidden;
  max-height: 350px;
  border-radius: 15px;
  border: 1px solid #2f3336;
  display: flex;
`;

export const Media = styled.img`
  width: 100%;
  object-fit: contain;
`;
