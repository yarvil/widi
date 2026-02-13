import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainLogoSvg from "@/shared/assets/logo/WiDi.svg?react";
import SmsLogo from "@/shared/assets/icons/mail.svg?react";
import MenuLogo from "@/shared/assets/icons/menu.svg?react";
import PostLogo from "@/shared/assets/icons/rows-3.svg?react";
import FavsLogo from "@/shared/assets/icons/heart.svg?react";
import LogOut from "@/shared/assets/icons/log-out.svg?react";
import HomeLogo from "@/shared/assets/icons/house.svg?react";
import ProfileLogo from "@/shared/assets/icons/circle-user-round.svg?react";
import NotificationLogo from "@/shared/assets/icons/bell.svg?react";
import CircleNotif from "@/shared/assets/icons/circle.svg?react";
import FollowIcon from "@/shared/assets/icons/user-round-plus.svg?react";
import { selectorIsShow } from "@/app/store/header/headerSelectors";
import { actionMenu, closeMenu } from "@/app/store/header/headerSlice";
import { selectorNotifications } from "@/app/store/notifications/notificationsSelector";
import { clearNotifications } from "@/app/store/notifications/notificationsSlice";
import { useMediaQuery } from "@/hooks/useMedia";
import { selectorFavorites } from "@/app/store/favorite/favoriteSelector";
import { clearFavorites } from "@/app/store/favorite/favoriteSlice";
import ModalWindow from "../Modal/Modal";
import {
  Heder,
  Name,
  HeaderWrapper,
  MenuMiddleWrapper,
  LogoWrapper,
  Title,
  IconWrapper,
  HeaderSearch,
  MenuSideWrapper,
} from "./HeaderStyled";

import { setSearchValue } from "@/app/store/search/searchSlice";
import { logout } from "@/app/store/authentication/authSlice";

export default function AuthMenu() {
  const isShow = useSelector(selectorIsShow);
  const hasNew = useSelector(selectorNotifications);
  const [modal, setModal] = useState(false);
  const hasNewFavs = useSelector(selectorFavorites);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  function showBurgerMenu() {
    dispatch(actionMenu());
  }
  function closeModal() {
    setModal(!modal);
  }
  function logOut() {
    dispatch(logout());
  }
  return (
    <>
      <ModalWindow closeModal={closeModal} isOpen={modal} logOut={logOut} />
      {isMobile && (
        <Heder>
          <HeaderWrapper>
            <LogoWrapper>
              <NavLink to="/">
                <MainLogoSvg />
                <Title>WiDi</Title>
              </NavLink>
              <HeaderSearch
                size="10"
                placeholder="Search Post..."
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
              />
            </LogoWrapper>
            <MenuLogo onClick={showBurgerMenu} />
            {isShow && (
              <MenuMiddleWrapper>
                <NavLink to="/" onClick={() => dispatch(closeMenu())}>
                  <HomeLogo />
                  Home Page
                </NavLink>
                <NavLink to="/users/:id" onClick={() => dispatch(closeMenu())}>
                  <ProfileLogo />
                  Profile
                </NavLink>
                <NavLink to="/chat" onClick={() => dispatch(closeMenu())}>
                  <SmsLogo />
                  Messenger
                </NavLink>
                <NavLink to="/posts" onClick={() => dispatch(closeMenu())}>
                  <PostLogo />
                  Posts
                </NavLink>
                <NavLink
                  to="/favorite"
                  onClick={() => {
                    (dispatch(clearFavorites()), dispatch(closeMenu()));
                  }}
                >
                  {hasNewFavs && (
                    <>
                      <CircleNotif />
                      <FavsLogo />
                    </>
                  )}
                  {!hasNewFavs && (
                    <>
                      <FavsLogo />
                    </>
                  )}
                  Favorite
                </NavLink>
                <NavLink
                  to="/notifications"
                  onClick={() => {
                    (dispatch(clearNotifications()), dispatch(closeMenu()));
                  }}
                >
                  {hasNew && (
                    <>
                      <CircleNotif />
                      <NotificationLogo />
                    </>
                  )}
                  {!hasNew && (
                    <>
                      <NotificationLogo />
                    </>
                  )}
                  Notifications
                </NavLink>
                <NavLink
                  onClick={() => {
                    (closeModal(), dispatch(closeMenu()));
                  }}
                >
                  <LogOut />
                  LogOut
                </NavLink>
              </MenuMiddleWrapper>
            )}
          </HeaderWrapper>
        </Heder>
      )}
      {isTablet && (
        <Heder>
          <HeaderWrapper>
            <LogoWrapper>
              <NavLink to="/">
                <MainLogoSvg />
                <Title>WiDi</Title>
              </NavLink>
              <HeaderSearch
                size="10"
                placeholder="Search Post..."
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
              />
            </LogoWrapper>
            <MenuMiddleWrapper>
              <NavLink to="/">
                <IconWrapper>
                  <HomeLogo />
                  <Name>Home Page</Name>
                </IconWrapper>
              </NavLink>
              <NavLink to="/posts">
                <IconWrapper>
                  <PostLogo />
                  <Name>Posts</Name>
                </IconWrapper>
              </NavLink>
              <NavLink
                to="/favorite"
                onClick={() => dispatch(clearFavorites())}
              >
                {hasNewFavs && (
                  <>
                    <IconWrapper>
                      <FavsLogo />
                      <CircleNotif />
                      <Name>Favorite</Name>
                    </IconWrapper>
                  </>
                )}
                {!hasNewFavs && (
                  <>
                    <IconWrapper>
                      <FavsLogo />
                      <Name>Favorite</Name>
                    </IconWrapper>
                  </>
                )}
              </NavLink>
              <NavLink to="/follow">
                <IconWrapper>
                  <FollowIcon />
                  <Name>Follow</Name>
                </IconWrapper>
              </NavLink>
            </MenuMiddleWrapper>
            <MenuSideWrapper>
              <NavLink to="/users/:id">
                <IconWrapper>
                  <ProfileLogo />
                  <Name>Profile</Name>
                </IconWrapper>
              </NavLink>
              <NavLink to="/chat">
                <IconWrapper>
                  <SmsLogo />
                  <Name>Messenger</Name>
                </IconWrapper>
              </NavLink>
              <NavLink
                to="/notifications"
                onClick={() => dispatch(clearNotifications())}
              >
                {hasNew && (
                  <>
                    <IconWrapper>
                      <NotificationLogo />
                      <CircleNotif />
                      <Name>Notifications</Name>
                    </IconWrapper>
                  </>
                )}
                {!hasNew && (
                  <>
                    <IconWrapper>
                      <NotificationLogo />
                      <Name>Notifications</Name>
                    </IconWrapper>
                  </>
                )}
              </NavLink>
              <NavLink onClick={() => closeModal()}>
                <IconWrapper>
                  <LogOut />
                  <Name>LogOut</Name>
                </IconWrapper>
              </NavLink>
            </MenuSideWrapper>
          </HeaderWrapper>
        </Heder>
      )}
      {isDesktop && (
        <Heder>
          <HeaderWrapper>
            <LogoWrapper>
              <NavLink to="/">
                <MainLogoSvg />
                <Title>WiDi</Title>
              </NavLink>
              <HeaderSearch
                size="10"
                placeholder="Search Post..."
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
              />
            </LogoWrapper>
            <MenuMiddleWrapper>
              <NavLink to="/">
                <IconWrapper>
                  <HomeLogo />
                  <Name>Home Page</Name>
                </IconWrapper>
              </NavLink>
              <NavLink to="/posts">
                <IconWrapper>
                  <PostLogo />
                  <Name>Posts</Name>
                </IconWrapper>
              </NavLink>
              <NavLink
                to="/favorite"
                onClick={() => dispatch(clearFavorites())}
              >
                {hasNewFavs && (
                  <>
                    <IconWrapper>
                      <FavsLogo />
                      <CircleNotif />
                      <Name>Favorite</Name>
                    </IconWrapper>
                  </>
                )}
                {!hasNewFavs && (
                  <>
                    <IconWrapper>
                      <FavsLogo />
                      <Name>Favorite</Name>
                    </IconWrapper>
                  </>
                )}
              </NavLink>
              <NavLink to="/follow">
                <IconWrapper>
                  <FollowIcon />
                  <Name>Follow</Name>
                </IconWrapper>
              </NavLink>
            </MenuMiddleWrapper>
            <MenuSideWrapper>
              <NavLink to="/users/:id">
                <IconWrapper>
                  <ProfileLogo />
                  <Name>Profile</Name>
                </IconWrapper>
              </NavLink>
              <NavLink to="/chat">
                <IconWrapper>
                  <SmsLogo />
                  <Name>Messenger</Name>
                </IconWrapper>
              </NavLink>
              <NavLink
                to="/notifications"
                onClick={() => dispatch(clearNotifications())}
              >
                {hasNew && (
                  <>
                    <IconWrapper>
                      <NotificationLogo />
                      <CircleNotif />
                      <Name>Notifications</Name>
                    </IconWrapper>
                  </>
                )}
                {!hasNew && (
                  <>
                    <IconWrapper>
                      <NotificationLogo />
                      <Name>Notifications</Name>
                    </IconWrapper>
                  </>
                )}
              </NavLink>
              <NavLink onClick={() => closeModal()}>
                <IconWrapper>
                  <LogOut />
                  <Name>LogOut</Name>
                </IconWrapper>
              </NavLink>
            </MenuSideWrapper>
          </HeaderWrapper>
        </Heder>
      )}
    </>
  );
}
