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

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
`;

export const Header = styled.div`
  margin-block: 12px 5px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const AuthorName = styled.h3`
  margin: 0;
  font-size: 15px;
  &:hover {
    text-decoration: underline;
  }
`;

export const AuthorUsername = styled.p`
  color: #6e767d;
  font-size: 15px;
  margin: 0;
`;

export const Text = styled.p`
  margin-block: 0 12px;
  font-size: 15px;
  color: #d9d9d9;
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
