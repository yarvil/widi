import React, { useEffect } from "react";
import Notifications from "./Notifications";
import { useSelector, useDispatch } from "react-redux";
import { IconWrapper, ReadAllText } from "./NotificationsStyled";
import ReadAllIcon from '@/shared/assets/icons/bell-dot.svg?react'
import { readAllThunk } from "@/app/store/notifications/notificationsSlice";
import { SaveWrapper, TextSave, TitleSave } from "../FavoriteList/FavoriteListStyled";
import { fetchMyNotificationsThunk } from "@/app/store/notifications/notificationsSlice";
import { selectFeedNotifications } from "@/app/store/notifications/notificationsSelector";
import PageHeader from "@/shared/ui/PageHeader/PageHeader";
import PageWrapper from "@/shared/ui/PageWrapper";


export default function NotificationList() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectFeedNotifications);
  useEffect(() => {
    dispatch(fetchMyNotificationsThunk());
  }, [dispatch]);

  return (

    <PageWrapper>
      <PageHeader title="Сповіщення" />
      {notifications.length === 0 ? (
        <SaveWrapper>
          <TitleSave>У вас поки немає сповіщень</TitleSave>
          <TextSave>
            Коли хтось взаємодіятиме з вами, це з’явиться тут
          </TextSave>
        </SaveWrapper>
      ) : 
      <IconWrapper>
        <ReadAllIcon onClick={() => dispatch(readAllThunk())} />
        <ReadAllText>
          Позначити всі як прочитані
        </ReadAllText>
      </IconWrapper>}

      {notifications.map((notification) => (
        <Notifications
          key={notification.id}
          notification={notification}
        />
      ))}
    </PageWrapper>

  );
}
