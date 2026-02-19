import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { loadThreads } from "@/app/store/chat/chatThunks";

import { selectUsers } from "@/app/store/users/usersSelectors";
import { fetchUsersThunk } from "@/app/store/users/usersSlice";

import { AppContainer } from "./components/common/styles";
import ChatAreaComponent from "./components/chat/ChatAreaComponents";
import ConversationListComponent from "./components/sidebar/ConversationListComponent";

const ChatPage = () => {
  const dispatch = useDispatch();

  const [isMobileChatOpen, setIsMobileChatOpen] = useState(true);

  const handleOpenChatlist = () => {
    setIsMobileChatOpen((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const users = useSelector(selectUsers);

  return (
    <AppContainer>
      <ConversationListComponent
        users={users}
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
