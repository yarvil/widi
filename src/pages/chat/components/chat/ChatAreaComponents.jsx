import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "@/app/store/chat/slices/chatSlice";

import {
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
} from "./styles";
import { Avatar, OnlineIndicator } from "../sidebar/styles";

const ChatAreaComponent = () => {
  const dispatch = useDispatch();
  const { conversations, messages, activeConversationId } = useSelector(
    (state) => state.chat
  );
  const [inputValue, setInputValue] = useState("");

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );
  const currentMessages = messages[activeConversationId] || [];

  const handleSend = () => {
    if (inputValue.trim()) {
      dispatch(
        sendMessage({
          conversationId: activeConversationId,
          content: inputValue,
        })
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
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#65676b",
          }}
        >
          Choose a chat
        </div>
      </ChatArea>
    );
  }

  return (
    <ChatArea>
      <ChatHeader>
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
          <div key={msg.id}>
            <MessageWrapper isOwn={msg.isOwn}>
              <div>
                <MessageBubble isOwn={msg.isOwn}>{msg.content}</MessageBubble>
                <MessageTime isOwn={msg.isOwn}>{msg.timestamp}</MessageTime>
              </div>
            </MessageWrapper>
          </div>
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

export default ChatAreaComponent;
