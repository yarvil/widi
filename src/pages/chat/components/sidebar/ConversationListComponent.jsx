import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveConversation,
  deleteConversation,
} from "@/app/store/chat/slices/chatSlice";

import {
  Sidebar,
  SidebarHeader,
  SearchBar,
  SearchWrapper,
  SearchIcon,
  ConversationList,
  ConversationItem,
  Avatar,
  OnlineIndicator,
  ConversationInfo,
  ConversationName,
  ConversationDetails,
  ConversationOptions,
  ConversationOptionsMenu,
  Timestamp,
  LastMessage,
  LastMessageText,
  UnreadBadge,
} from "./styles";

import SearchIconSvg from "@/shared/icons/search.svg";
import OptionsIcon from "@/shared/icons/conversation-options.png";

const ConversationListComponent = ({ handleChatList, isChatListOpen }) => {
  const dispatch = useDispatch();
  const { conversations, activeConversationId } = useSelector(
    (state) => state.chat,
  );

  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const chatMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatMenuRef.current && !chatMenuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleOpenConvOptions = (convId, event) => {
    event.stopPropagation();

    setOpenMenuId((prev) => (prev === convId ? null : convId));
  };

  return (
    <Sidebar $isChatListOpen={isChatListOpen}>
      <SidebarHeader>
        <h2>Messages</h2>
        <SearchWrapper>
          <SearchIcon src={SearchIconSvg} />
          <SearchBar
            placeholder="Search Direct Messages"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
          />
        </SearchWrapper>
      </SidebarHeader>
      <ConversationList>
        {filteredConversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            active={conv.id === activeConversationId}
            onClick={() => {
              if (window.innerWidth < 768) {
                handleChatList();
              }
              dispatch(setActiveConversation(conv.id));
            }}
          >
            <Avatar>
              {conv.avatar}
              <OnlineIndicator online={conv.isOnline} />
            </Avatar>
            <ConversationInfo>
              <ConversationName>
                {conv.name}
                <ConversationDetails>
                  <Timestamp>{conv.timestamp}</Timestamp>
                  <ConversationOptions
                    onClick={(event) => handleOpenConvOptions(conv.id, event)}
                  >
                    <img
                      src={OptionsIcon}
                      alt="Chat options"
                      width="15"
                      height="15"
                    />
                  </ConversationOptions>
                </ConversationDetails>
              </ConversationName>
              <LastMessage>
                <LastMessageText>{conv.lastMessage}</LastMessageText>
                {conv.unreadCount > 0 && (
                  <UnreadBadge>{conv.unreadCount}</UnreadBadge>
                )}
              </LastMessage>
            </ConversationInfo>

            {openMenuId === conv.id && (
              <ConversationOptionsMenu ref={chatMenuRef}>
                <button
                  onClick={() => {
                    dispatch(deleteConversation(conv.id));
                  }}
                >
                  Delete Chat
                </button>
              </ConversationOptionsMenu>
            )}
          </ConversationItem>
        ))}
      </ConversationList>
    </Sidebar>
  );
};

ConversationListComponent.propTypes = {
  handleChatList: PropTypes.func.isRequired,
  isChatListOpen: PropTypes.bool.isRequired,
};

export default ConversationListComponent;
