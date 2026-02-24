import styled from "styled-components";

export const ProfileContainer = styled.div`
  position: relative;
`;

export const HeaderImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${(props) =>
    props.$hasImage
      ? `url(${props.$imageUrl})`
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  ${(props) =>
    !props.$hasImage &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
    }
  `}
`;

export const AvatarWrapper = styled.div`
  position: absolute;
  top: 140px;
  left: 16px;
`;

export const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #000;
  background: ${(props) =>
    props.$hasImage
      ? `url(${props.$imageUrl})`
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
`;

export const AvatarInitials = styled.span`
  position: absolute;
  z-index: 1;
`;

export const ProfileInfo = styled.div`
  padding: 80px 16px 16px;
`;

export const ProfileActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 16px;
`;

export const EditButton = styled.button`
  border-radius: 9999px;
  padding: 9px 16px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid rgb(83, 100, 113);
  background-color: transparent;
  color: rgb(239, 243, 244);
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(239, 243, 244, 0.1);
  }
`;

export const FollowButton = styled.button`
  border-radius: 9999px;
  padding: 9px 16px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 100px;

  .hover-text {
    display: none;
  }

  ${(props) =>
    props.$following
      ? `
    color: rgb(239, 243, 244);
    border: 1px solid rgb(83, 100, 113);
    background-color: transparent;

    &:hover {
      color: rgb(244, 33, 46);
      border: 1px solid rgb(103, 7, 15);
      background-color: rgba(244, 33, 46, 0.1);

      .default-text {
        display: none;
      }

      .hover-text {
        display: inline;
      }
    }
  `
      : `
    color: rgb(15, 20, 25);
    border: transparent;
    background-color: rgb(239, 243, 244);

    &:hover {
      background-color: rgb(215, 219, 220);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const MessageButton = styled.button`
  border-radius: 9999px;
  padding: 9px 16px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid rgb(83, 100, 113);
  background-color: transparent;
  color: rgb(239, 243, 244);
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(239, 243, 244, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SubscribeButton = styled.button`
  border-radius: 9999px;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid rgb(83, 100, 113);
  background-color: ${(props) =>
    props.$subscribed ? "#fff" : "rgb(29, 155, 240)"};
  color: ${(props) => (props.$subscribed ? "#000" : "#fff")};

  &:hover {
    background-color: ${(props) =>
      props.$subscribed ? "rgba(255, 255, 255, 0.9)" : "rgb(26, 140, 216)"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const UserName = styled.h2`
  color: rgb(231, 233, 234);
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px 0;
`;

export const UserHandle = styled.p`
  color: rgb(113, 118, 123);
  font-size: 15px;
  margin: 0 0 12px 0;
`;

export const UserBioSection = styled.div`
  margin-bottom: 16px;
  max-width: 100%;
  min-width: 0;
`;

export const UserBioLabel = styled.span`
  display: block;
  color: rgb(113, 118, 123);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const UserBio = styled.p`
  color: ${(props) =>
    props.$empty ? "rgb(113, 118, 123)" : "rgb(231, 233, 234)"};
  font-size: 15px;
  margin: 0;
  line-height: 1.5;
  font-style: ${(props) => (props.$empty ? "italic" : "normal")};
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  max-width: 100%;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

export const DetailItem = styled.div`
  color: rgb(113, 118, 123);
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 18px;
  }
`;

export const FollowStats = styled.div`
  display: flex;
  gap: 20px;
  padding: 12px 0;
  border-top: 1px solid #2f3336;
  border-bottom: 1px solid #2f3336;
  margin: 0 -16px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const StatItem = styled.div`
  display: flex;
  gap: 4px;
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};

  &:hover {
    text-decoration: ${(props) => (props.$clickable ? "underline" : "none")};
  }
`;

export const StatValue = styled.span`
  color: rgb(231, 233, 234);
  font-size: 15px;
  font-weight: 700;
`;

export const StatLabel = styled.span`
  color: rgb(113, 118, 123);
  font-size: 15px;
`;

export const FollowingModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: #000;
  border: 1px solid #2f3336;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: auto;
  z-index: 1001;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #2f3336;
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(239, 243, 244, 0.1);
    border-radius: 50%;
  }
`;

export const ModalUserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #2f3336;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(239, 243, 244, 0.05);
  }
`;

export const ModalUserAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
`;

export const ModalUserAvatarPlaceholder = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  flex-shrink: 0;
`;

export const ModalUserInfo = styled.div`
  flex: 1;
`;

export const PostsSection = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #2f3336;
`;

export const PostCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #2f3336;
`;
