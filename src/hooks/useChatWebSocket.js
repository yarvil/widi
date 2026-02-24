import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export function useWebSocket() {
  const clientRef = useRef(null);
  const subscriptionsRef = useRef({});
  const [connected, setConnected] = useState(false);

  const jwtToken = localStorage.getItem("token");

  useEffect(() => {
    const socket = new SockJS("https://step-project-api.onrender.com/ws");

    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
      reconnectDelay: 5000,
      debug: (str) => console.log("STOMP DEBUG:", str),

      onConnect: () => {
        console.log("WebSocket connected");
        setConnected(true);
      },

      onStompError: (frame) => console.error("STOMP error", frame),
      onWebSocketClose: () => setConnected(false),
    });

    stompClient.activate();
    clientRef.current = stompClient;

    return () => {
      // Отписка от всех подписок при размонтировании хука
      Object.values(subscriptionsRef.current).forEach((sub) =>
        sub.unsubscribe(),
      );
      subscriptionsRef.current = {};
      stompClient.deactivate();
    };
  }, []);

  const subscribeToThread = (threadId, onMessage) => {
    if (!clientRef.current || !clientRef.current.connected) return null;

    // Если подписка есть и она активна — возвращаем её
    if (subscriptionsRef.current[threadId])
      return subscriptionsRef.current[threadId];

    const sub = clientRef.current.subscribe(
      `/topic/chat/${threadId}`,
      (msg) => {
        const data = JSON.parse(msg.body);
        onMessage(data);
        console.log("RAW MESSAGE:", msg.body);
      },
    );

    subscriptionsRef.current[threadId] = sub;
    return sub;
  };

  const unsubscribeFromThread = (threadId) => {
    const sub = subscriptionsRef.current[threadId];
    if (sub) {
      sub.unsubscribe();
      delete subscriptionsRef.current[threadId];
    }
  };

  const sendMessage = (threadId, recipientUserId, content) => {
    if (!clientRef.current || !clientRef.current.connected) return;

    clientRef.current.publish({
      destination: "/app/chat/send",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ threadId, recipientUserId, content }),
    });
  };

  return { connected, subscribeToThread, unsubscribeFromThread, sendMessage };
}
