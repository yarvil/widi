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

export const LoadMoreButton = styled(NewPostsButton)`
  padding: 16px;
`;
