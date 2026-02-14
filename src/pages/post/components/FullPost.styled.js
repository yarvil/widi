import styled from "styled-components";

export const FullPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 12px;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: sticky;
  top: 0;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(12px);
  & > * {
    margin-left: 8px;
  }
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const PostAuthor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
