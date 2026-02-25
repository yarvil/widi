import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { addNotification } from "@/app/store/notifications/notificationsSlice";
import { useDispatch } from "react-redux";
import {
    selectCurrentUser,
    selectIsAuthenticated,
} from "@/app/store/authentication/authSelectors";
function useNotificationsSocket() {
    const currentUser = useSelector(selectCurrentUser);
   
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuthenticated);
    const token = localStorage.getItem('token')
   

    const stompClientRef = useRef(null);
    useEffect(() => {
        if (!isAuth || !currentUser?.id) return;
        const socket = new SockJS(
            'https://step-project-api.onrender.com/ws',
            null,
            { withCredentials: true }
        );
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            debug: (str) => {
                console.log(str);
            },
            connectHeaders: { Authorization: `Bearer ${token}` },
            onConnect: () => {
                console.log("Connected to WebSocket");

                stompClient.subscribe(
                    `/topic/notifications/${currentUser?.id}`,
                    (message) => {
                        const notification = JSON.parse(message.body);
                        dispatch(addNotification(notification))

                        console.log(notification)

                    }
                );
            },
            onStompError: (frame) => {
                console.error(" STOMP error:", frame);
            },
        });
        stompClient.activate();
        stompClientRef.current = stompClient;

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
                console.log("WebSocket disconnected");
            }
        };
    }, [isAuth, currentUser?.id,token, dispatch]);
}
export default useNotificationsSocket