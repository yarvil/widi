import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveConversation,
  deleteConversation,
  createNewConversation,
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
  CreateChatConatainer,
  CreateChatTitle,
  CreateChatSearch,
  CreateChatList,
  CreateChatElement,
  CreateChatText,
} from "./styles";

// import OptionsIcon from "@/shared/icons/conversation-options.png";
import SearchIconSvg from "@/shared/assets/icons/search.svg";
// import SearchIconSvg from "@/shared/icons/search.svg";
import OptionsIcon from "@/shared/assets/icons/ellipsis-vertical.svg?react";
import { loadUsers } from "@/app/store/chat/chatThunks";

const ConversationListComponent = ({ handleChatList, isChatListOpen }) => {
  const dispatch = useDispatch();
  const { conversations, activeConversationId, otherUsers } = useSelector(
    (state) => state.chat,
  );

  // const isConversation =
  //   Array.isArray(conversations) && conversations.length > 0;
  const isConversation =
    !Array.isArray(conversations) || conversations.length >= otherUsers.length;

  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchNewParticipants, setSearchNewParticipants] = useState("");

  const chatMenuRef = useRef(null);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

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
    conv.participants[1].firstName.toLowerCase().includes(search.toLowerCase()),
  );
  const filteredNewParticipants =
    searchNewParticipants.trim().length > 0
      ? otherUsers.filter((participant) =>
          participant.firstName
            .toLowerCase()
            .includes(searchNewParticipants.toLowerCase()),
        )
      : [];

  console.log(otherUsers, "otherUsers");
  console.log(filteredNewParticipants, "newPart");

  const handleOpenConvOptions = (convId, event) => {
    event.stopPropagation();

    setOpenMenuId((prev) => (prev === convId ? null : convId));
  };

  const handleSelectUser = (userId) => {
    dispatch(createNewConversation(userId));

    // Очищаем поиск
    setSearchNewParticipants("");

    // На мобайле закрываем список чатов
    if (window.innerWidth < 768) {
      handleChatList();
    }
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
              {/* Временная заглушка в виде первых двух букв для аватарки */}
              {conv.participants[1].firstName.slice(0, 2)}
              {/* Пока что у бека нет возможности отобразить онлайн человек или нет */}
              <OnlineIndicator online={conv.isOnline} />
            </Avatar>
            <ConversationInfo>
              <ConversationName>
                {conv.participants[1].firstName}
                <ConversationDetails>
                  <Timestamp>{conv.timestamp}</Timestamp>
                  <ConversationOptions
                    onClick={(event) => handleOpenConvOptions(conv.id, event)}
                  >
                    <OptionsIcon />
                    {/* <img
                      src={OptionsIcon}
                      alt="Chat options"
                      width="15"
                      height="15"
                    /> */}
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
                  onClick={(event) => {
                    event.stopPropagation();
                    dispatch(deleteConversation(conv.id));
                  }}
                >
                  Delete Chat
                </button>
              </ConversationOptionsMenu>
            )}
          </ConversationItem>
        ))}

        {!isConversation && (
          <CreateChatConatainer>
            <CreateChatTitle>Create a new chat</CreateChatTitle>
            <CreateChatSearch
              name="searchNewParticipants"
              value={searchNewParticipants}
              onChange={(e) => setSearchNewParticipants(e.target.value)}
              type="text"
              placeholder="Search users..."
            />
            <CreateChatList>
              {filteredNewParticipants.map((newParticipant) => (
                <CreateChatElement
                  key={newParticipant.id}
                  onClick={() => handleSelectUser(newParticipant.id)}
                >
                  <CreateChatText>{newParticipant.firstName}</CreateChatText>
                </CreateChatElement>
              ))}
            </CreateChatList>
          </CreateChatConatainer>
        )}
      </ConversationList>
    </Sidebar>
  );
};

ConversationListComponent.propTypes = {
  handleChatList: PropTypes.func.isRequired,
  isChatListOpen: PropTypes.bool.isRequired,
};

export default ConversationListComponent;
