import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveConversationId,
  deleteConversation,
} from "@/app/store/chat/slices/chatSlice";

import { formatTime } from "../../utils/chatHelper";

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

import SearchIconSvg from "@/shared/assets/icons/search.svg";
import OptionsIcon from "@/shared/assets/icons/ellipsis-vertical.svg?react";
import {
  createNewThread,
  loadUsers,
  loadThreads,
} from "@/app/store/chat/chatThunks";

import {
  selectThreads,
  selectActiveConversationId,
  selectCurrentUser,
} from "@/app/store/chat/selectors";

const ConversationListComponent = ({
  handleChatList,
  isChatListOpen,
  users,
}) => {
  const dispatch = useDispatch();

  const threads = useSelector(selectThreads);
  const activeConversationId = useSelector(selectActiveConversationId);
  const currentUser = useSelector(selectCurrentUser);

  const otherUsers = useMemo(
    () => users.filter((user) => user.id !== currentUser.id),
    [users, currentUser.id],
  );

  const isConversation =
    !Array.isArray(threads) || threads.length >= otherUsers.length;

  const [search, setSearch] = useState("");
  const [searchNewParticipants, setSearchNewParticipants] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const chatMenuRef = useRef(null);

  // Загружаем пользователей и чаты один раз
  useEffect(() => {
    dispatch(loadUsers());
    dispatch(loadThreads());
  }, [dispatch]);

  // Закрытие меню при клике вне
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

  // Фильтруем чаты по поиску
  const filteredThreads = useMemo(() => {
    return threads.filter((conv) =>
      conv?.otherParticipant?.username
        ?.toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [threads, search]);

  // Фильтруем новых участников для создания чата
  const filteredNewParticipants = useMemo(() => {
    if (!searchNewParticipants.trim()) return [];
    return otherUsers.filter((participant) =>
      participant.firstName
        .toLowerCase()
        .includes(searchNewParticipants.toLowerCase()),
    );
  }, [otherUsers, searchNewParticipants]);

  const handleSelectThread = useCallback(
    (id) => {
      console.log(id);
      if (window.innerWidth < 768) handleChatList();
      dispatch(setActiveConversationId(id));
    },
    [dispatch, handleChatList],
  );

  const handleSelectUser = useCallback(
    (userId) => {
      dispatch(createNewThread(userId));
      setSearchNewParticipants("");
      if (window.innerWidth < 768) handleChatList();
    },
    [dispatch, handleChatList],
  );

  const handleOpenConvOptions = useCallback((convId, event) => {
    event.stopPropagation();
    setOpenMenuId((prev) => (prev === convId ? null : convId));
  }, []);

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
          />
        </SearchWrapper>
      </SidebarHeader>

      <ConversationList>
        {filteredThreads.map((thread) => (
          <ConversationItem
            key={thread.id}
            active={thread.id === activeConversationId}
            onClick={() => handleSelectThread(thread.id)}
          >
            <Avatar>
              {thread?.otherParticipant?.username.slice(0, 2)}
              <OnlineIndicator online={thread.isOnline} />
            </Avatar>
            <ConversationInfo>
              <ConversationName active={thread.id === activeConversationId}>
                {thread.otherParticipant.username.slice(0, 9)}
                <ConversationDetails>
                  <Timestamp>{formatTime(thread.updatedAt)}</Timestamp>
                  <ConversationOptions
                    onClick={(event) => handleOpenConvOptions(thread.id, event)}
                  >
                    <OptionsIcon />
                  </ConversationOptions>
                </ConversationDetails>
              </ConversationName>
              <LastMessage active={thread.id === activeConversationId}>
                <LastMessageText>{thread.lastMessage}</LastMessageText>
                {thread.unreadCount > 0 && (
                  <UnreadBadge>{thread.unreadCount}</UnreadBadge>
                )}
              </LastMessage>
            </ConversationInfo>

            {openMenuId === thread.id && (
              <ConversationOptionsMenu ref={chatMenuRef}>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    dispatch(deleteConversation(thread.id));
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
              value={searchNewParticipants}
              onChange={(e) => setSearchNewParticipants(e.target.value)}
              placeholder="Search users..."
            />
            <CreateChatList>
              {filteredNewParticipants.map((participant) => (
                <CreateChatElement
                  key={participant.id}
                  onClick={() => handleSelectUser(participant.id)}
                >
                  <CreateChatText>{participant.firstName}</CreateChatText>
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
  users: PropTypes.array.isRequired,
};

export default ConversationListComponent;
