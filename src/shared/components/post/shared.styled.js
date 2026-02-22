import { Link } from "react-router-dom";
import styled from "styled-components";

export const PostHeader = styled.div`
  display: flex;
  align-items: ${(props) => (props.$fullPost ? "start" : "center")};
  justify-content: space-between;
  padding-top: ${(props) => (props.$fullPost ? "0" : "12px")};
  gap: ${(props) => (props.$fullPost ? "12px" : "4px")};
`;

export const AuthorWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 12px;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$fullPost ? "column" : "row")};
  gap: ${(props) => (props.$fullPost ? "2px" : "5px")};
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
