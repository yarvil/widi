import React, { useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "@/app/store/chat/slices/chatSlice";

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
import { Avatar, OnlineIndicator } from "../sidebar/styles";

import ArrowLeftIcon from "@/shared/icons/arrow-left.png";

const ChatAreaComponent = ({ handleChatList, isChatListOpen }) => {
  const dispatch = useDispatch();
  const { conversations, messages, activeConversationId } = useSelector(
    (state) => state.chat,
  );
  const [inputValue, setInputValue] = useState("");

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId,
  );
  const currentMessages = messages[activeConversationId] || [];

  const handleSend = () => {
    if (inputValue.trim()) {
      dispatch(
        sendMessage({
          conversationId: activeConversationId,
          content: inputValue,
        }),
      );
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!activeConversation) {
    return (
      <ChatArea>
        <BackToListButton
          src={ArrowLeftIcon}
          onClick={handleChatList}
          alt="Back to chat list"
        />
        <EmptyState>Choose a chat</EmptyState>
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
        />
        <Avatar>
          {activeConversation.avatar}
          <OnlineIndicator online={activeConversation.isOnline} />
        </Avatar>
        <ChatHeaderInfo>
          <h3>{activeConversation.name}</h3>
          <p>{activeConversation.isOnline ? "В сети" : "Не в сети"}</p>
        </ChatHeaderInfo>
      </ChatHeader>

      <MessagesContainer>
        {currentMessages.map((msg) => (
          <MessageWrapper $isOwn={msg.isOwn} key={msg.id}>
            <div>
              <MessageBubble $isOwn={msg.isOwn}>{msg.content}</MessageBubble>
              <MessageTime $isOwn={msg.isOwn}>{msg.timestamp}</MessageTime>
            </div>
          </MessageWrapper>
        ))}
      </MessagesContainer>

      <InputArea>
        <MessageInput
          placeholder="Enter a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SendButton onClick={handleSend} disabled={!inputValue.trim()}>
          Отправить
        </SendButton>
      </InputArea>
    </ChatArea>
  );
};

ChatAreaComponent.propTypes = {
  handleChatList: PropTypes.func.isRequired,
  isChatListOpen: PropTypes.bool.isRequired,
};

export default ChatAreaComponent;
