import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWebSocket } from "@/hooks/useChatWebSocket";

import { selectUsers } from "@/app/store/users/usersSelectors";
import {
  selectThreads,
  selectActiveConversationId,
  selectCurrentUser,
  selectOtherUsers,
} from "@/app/store/chat/selectors";
import { fetchUsersThunk } from "@/app/store/users/usersSlice";
import { receiveMessage } from "@/app/store/chat/slices/chatSlice";

import { AppContainer } from "./components/common/styles";
import ChatAreaComponent from "./components/chat/ChatAreaComponents";
import ConversationListComponent from "./components/sidebar/ConversationListComponent";
import { fetchMessages } from "@/api/messages";

const ChatPage = () => {
  const dispatch = useDispatch();

  const [isMobileChatOpen, setIsMobileChatOpen] = useState(true);

  const threads = useSelector(selectThreads);
  const activeConversationId = useSelector(selectActiveConversationId);
  const currentUser = useSelector(selectCurrentUser);
  const users = useSelector(selectUsers);

  // WebSocket hook
  const { connected, subscribeToThread, sendMessage } = useWebSocket();

  // Хранение подписок на все открытые чаты
  const subscriptionsRef = useRef({});

  // -------------------------------
  // Подписка на активный чат
  // -------------------------------
  useEffect(() => {
    if (!connected || !activeConversationId) return;

    subscribeToThread(activeConversationId, (message) => {
      dispatch(receiveMessage({ threadId: message.threadId, message }));
    });

    // dispatch(loadMessagesByThreads(activeConversationId));

    // Отписка при размонтировании компонента или закрытии чата
    return () => {
      // Оставляем подписку для других чатов, только снимаем с текущего
      if (subscriptionsRef.current[activeConversationId]) {
        subscriptionsRef.current[activeConversationId].unsubscribe();
        delete subscriptionsRef.current[activeConversationId];
      }
    };
  }, [connected, activeConversationId, dispatch, subscribeToThread]);

  // -------------------------------
  // Полная очистка подписок при уходе со страницы
  // -------------------------------
  useEffect(() => {
    return () => {
      Object.values(subscriptionsRef.current).forEach((sub) =>
        sub.unsubscribe(),
      );
      subscriptionsRef.current = {};
    };
  }, []);

  // Фетчим пользователей один раз
  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const handleOpenChatlist = () => {
    setIsMobileChatOpen((prev) => !prev);
  };

  // Отправка сообщения через WebSocket
  const handleSendMessage = async (content) => {
    if (!activeConversationId) return;
    const activeThread = threads.find(
      (thread) => thread.id === activeConversationId,
    );
    const recipientUserId = activeThread?.otherParticipant?.id;
    if (!recipientUserId) return;

    // Отправляем через WebSocket
    sendMessage(activeConversationId, recipientUserId, content);
  };

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
        handleSend={handleSendMessage}
      />
    </AppContainer>
  );
};

export default ChatPage;
