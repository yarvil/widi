import React, { useState } from "react";

import { AppContainer } from "./components/common/styles";
import ChatAreaComponent from "./components/chat/ChatAreaComponents";
import ConversationListComponent from "./components/sidebar/ConversationListComponent";

const ChatPage = () => {
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(true);

  const handleOpenChatlist = () => {
    setIsMobileChatOpen((prev) => !prev);
  };

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
