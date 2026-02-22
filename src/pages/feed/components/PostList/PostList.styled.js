import { Link } from "react-router-dom";
import styled from "styled-components";

export const NewPostsButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  background: transparent;
  color: rgb(29, 155, 240);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
  border-bottom: 1px solid #2f3336;

  &:hover {
    background: rgba(29, 155, 240, 0.1);
  }
`;

export const EmptyPostsWrapper = styled.div`
  margin: 30px auto;
  padding-inline: 20px;
  max-width: calc(400px);
  display: flex;
  flex-direction: column;
`;

export const EmptyPostsTitle = styled.h2`
  font-size: 28px;
  color: rgb(231, 233, 234);
  margin-block: 0 8px;
  padding: 0;
`;
export const EmptyPostsDesc = styled.p`
  font-size: 16px;
  color: rgb(113, 118, 123);
  margin-block: 0 28px;
  padding: 0;
`;

export const GoToFollowButton = styled(Link)`
  border-color: rgba(0, 0, 0, 0);
  background-color: rgb(29, 155, 240);
  font-size: 17px;
  font-weight: 600;
  min-width: 52px;
  min-height: 52px;
  padding-inline: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  align-self: flex-start;

  &:hover {
    background-color: rgb(26, 140, 216);
  }
`;

export const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
