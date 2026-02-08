import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadConversations } from "@/app/store/chat/chatThunks";

import { AppContainer } from "./components/common/styles";
import ChatAreaComponent from "./components/chat/ChatAreaComponents";
import ConversationListComponent from "./components/sidebar/ConversationListComponent";

const ChatPage = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.chat.currentUser.id);

  const [isMobileChatOpen, setIsMobileChatOpen] = useState(true);

  const handleOpenChatlist = () => {
    setIsMobileChatOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!userId) return;

    dispatch(loadConversations(userId));
  }, [userId, dispatch]);

  return (
    <AppContainer>
      <ConversationListComponent
        handleChatList={handleOpenChatlist}
        isChatListOpen={isMobileChatOpen}
      />
      <ChatAreaComponent
        handleChatList={handleOpenChatlist}
        isChatListOpen={isMobileChatOpen}
      />
    </AppContainer>
  );
};

export default ChatPage;
