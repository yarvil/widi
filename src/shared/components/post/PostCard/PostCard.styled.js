import styled from "styled-components";

export const PostCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #2f3336;
`;

export const PostContainer = styled.div`
  display: flex;
  padding-inline: 16px;
  gap: 12px;
  transition: 0.2s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

export const ReplyLine = styled.div`
  width: 2px;
  height: ${(props) => (props.$topLine ? "12px" : "100%")};
  background-color: #2f3336;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${(props) => (props.$withTopLine ? 0 : "12px")};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
`;

// export const AuthorCounts = styled.p`
//   color: #6e767d;
//   font-size: 15px;
//   margin: 0;
// `;
