import styled from "styled-components";

export const Sidebar = styled.div`
  width: clamp(290px, 22vw, 360px);
  background: black;
  border-right: 1px solid #2f3336;
  display: flex;
  flex-direction: column;
  text-align: left;
  transition: 0.7s ease;

  @media (max-width: 768px) {
    width: ${({ $isChatListOpen }) => ($isChatListOpen ? "100%" : "0px")};
    overflow: hidden;
    transition: 0.7s ease;
  }
`;

export const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #2f3336;
  color: white;

  h2 {
    margin: 0;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 700;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 80%;
  color: white;
`;

export const SearchIcon = styled.img`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  pointer-events: none;
`;

export const SearchBar = styled.input`
  background-color: transparent;
  width: 100%;
  padding: 10px 12px 10px 36px;
  border-radius: 20px;
  border: 1px solid #2f3336;
  color: white;

  &:focus {
    outline: #1877f2;
    border-color: #1877f2;
  }
`;

export const ConversationList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const ConversationItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  background: transparent;
  border-right: ${(props) => (props.active ? "2px solid #3d9effff" : "white")};
  transition: background 0.2s;
  max-height: 81px;
  color: white;
  border-bottom: 1px solid #2f3336;

  &:hover {
    background: #2f3336;
  }
`;

export const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 12px;
  position: relative;
`;

export const AvatarImg = styled.img`
  object-fit: contain;
  overflow: hidden;
  border-radius: 50%;
`;

export const AvatarImgNull = styled.div`
  width: 50px;
  text-align: center;
`;

export const OnlineIndicator = styled.div`
  width: 14px;
  height: 14px;
  background: ${(props) => (props.online ? "#44b700" : "#ccc")};
  border: 2px solid white;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const ConversationInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ConversationName = styled.div`
  font-weight: 600;
  color: white;
  font-size: 15px;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
`;

export const ConversationDetails = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

export const ConversationOptions = styled.button`
  display: flex;
  justify-content: center;
  margin-inline: 5px;
  background: none;
  border: none;
  width: 15px;
  cursor: pointer;
  padding: 0;
  color: white;

  &:hover {
    border-radius: 20px;
    background-color: #000000;
  }
`;

export const ConversationOptionsMenu = styled.div`
  margin-top: 40px;
  position: absolute;
  right: 20px;
`;

export const ConversationOptionsButton = styled.button`
  border: 2px solid #ffffff;
  color: red;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px;
`;

export const Timestamp = styled.span`
  font-size: 12px;
  color: #65676b;
  font-weight: 400;
`;

export const LastMessage = styled.div`
  font-size: 13px;
  color: ${(props) => (props.active ? "#000000" : "#ffffff")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LastMessageText = styled.span`
  max-width: 170px;
  overflow: hidden;
  color: white;
`;

export const UnreadBadge = styled.span`
  background: #1877f2;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 8px;
`;

export const CreateChatConatainer = styled.div`
  margin: 24px;
  padding: 16px;
  border-radius: 16px;
  background: transparent;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #2f3336;
`;
export const CreateChatTitle = styled.h3`
  text-align: center;
  margin-block: 0 12px;
  font-size: 18px;
  font-weight: 600;
  color: white;
`;

export const CreateChatSearch = styled.input`
  color: white;
  width: 100%;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid #2f3336;
  font-size: 14px;
  outline: none;
  background: transparent;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #3d9effff;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
`;
export const CreateChatList = styled.ul`
  padding: 0;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 260px;
  overflow-y: auto;
  padding-right: 4px;

  /* аккуратный скролл */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 4px;
  }
`;

export const CreateChatElement = styled.li`
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
  background: #1c1c1c;
  list-style: none;
  border: 1px solid #2f3336;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: #2b2b2b;
  }

  &:active {
    background: #030303;
  }
`;

export const CreateChatText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: white;
`;
