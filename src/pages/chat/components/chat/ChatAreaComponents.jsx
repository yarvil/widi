import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { loadMessagesByThreads } from "@/app/store/chat/chatThunks";
import { sendMessage, setCurrentUser } from "@/app/store/chat/slices/chatSlice";
import { selectCurrentUser } from "@/app/store/authentication/authSelectors";

import {
  selectThreads,
  selectActiveMessages,
  selectActiveConversationId,
  selectActiveThread,
} from "@/app/store/chat/selectors";

import { Avatar, AvatarImg, OnlineIndicator } from "../sidebar/styles";
import ArrowLeftIcon from "@/shared/assets/icons/arrow-left.svg?react";

import {
  EmptyState,
  ChatArea,
  ChatHeader,
  ChatHeaderInfo,
  MessagesContainer,
  MessageWrapper,
  MessageBubble,
  MessageTime,
  InputArea,
  MessageInput,
  SendButton,
  BackToListButton,
} from "./styles";

const ChatAreaComponent = ({ handleChatList, isChatListOpen, handleSend }) => {
  const dispatch = useDispatch();

  const activeConversationId = useSelector(selectActiveConversationId);
  const threads = useSelector(selectThreads);
  const currentUser = useSelector(selectCurrentUser);
  const currentMessages = useSelector(selectActiveMessages);
  const currentThread = useSelector(selectActiveThread);

  const authUser = useSelector(selectCurrentUser);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const activeConversation = threads.find(
    (thread) => thread.id === activeConversationId,
  );

  useEffect(() => {
    dispatch(setCurrentUser(authUser));
    if (!activeConversationId) return;
    dispatch(loadMessagesByThreads(activeConversationId));
  }, [activeConversationId, authUser, dispatch]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [currentMessages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
      setInputValue("");
    }
  };

  if (!activeConversation) {
    return (
      <ChatArea>
        <div src={ArrowLeftIcon}>
          <BackToListButton onClick={handleChatList} alt="Back to chat list" />
        </div>

        <EmptyState>Виберіть чат</EmptyState>
      </ChatArea>
    );
  }

  return (
    <ChatArea $isChatListOpen={isChatListOpen}>
      <ChatHeader>
        <BackToListButton
          src={ArrowLeftIcon}
          onClick={handleChatList}
          alt="Back to chat list"
        >
          <ArrowLeftIcon />
        </BackToListButton>
        <Avatar>
          {currentThread?.otherParticipant?.avatarUrl ? (
            <AvatarImg
              src={currentThread.otherParticipant.avatarUrl}
              alt="avatar"
              className="avatar"
            />
          ) : (
            <div className="avatar-fallback">
              {currentThread?.otherParticipant?.nickName
                ?.slice(0, 2)
                .toUpperCase()}
            </div>
          )}
          <OnlineIndicator online={activeConversation.isOnline} />
        </Avatar>
        <ChatHeaderInfo>
          <h3>{currentThread.otherParticipant.nickName}</h3>
          <p>{activeConversation.isOnline ? "Онлайн" : "Не в мережі"}</p>
        </ChatHeaderInfo>
      </ChatHeader>

      <MessagesContainer ref={messagesEndRef}>
        {currentMessages.map((msg) => (
          <MessageWrapper $isOwn={msg.senderId === currentUser.id} key={msg.id}>
            <div>
              <MessageBubble $isOwn={msg.senderId === currentUser.id}>
                {msg?.content}
              </MessageBubble>
              <MessageTime $isOwn={msg.senderId === currentUser.id}>
                {msg?.createdAt?.slice(11, 16)}
              </MessageTime>
            </div>
          </MessageWrapper>
        ))}
      </MessagesContainer>

      <InputArea>
        <MessageInput
          placeholder="Введіть повідомлення..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SendButton
          onClick={() => {
            handleSend(inputValue);
            setInputValue("");
          }}
          disabled={!inputValue.trim()}
        >
          Надіслати
        </SendButton>
      </InputArea>
    </ChatArea>
  );
};

ChatAreaComponent.propTypes = {
  handleChatList: PropTypes.func.isRequired,
  isChatListOpen: PropTypes.bool.isRequired,
  handleSend: PropTypes.func,
};

export default ChatAreaComponent;
