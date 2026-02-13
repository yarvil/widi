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
  font-size: 16px;
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

export const MoreButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  color: #71767b;

  &:hover {
    background-color: rgba(29, 155, 240, 0.1);
    color: rgb(29, 155, 240);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #000;
  border: 1px solid #2f3336;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
  min-width: 180px;
  z-index: 10;
  overflow: hidden;
`;

export const MenuItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: ${(props) => (props.$danger ? "#f4212e" : "#e7e9ea")};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  transition: 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }
`;
