import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import SmsIcon from "@/shared/assets/icons/mail.svg?react";
import MenuIcon from "@/shared/assets/icons/menu.svg?react";
import BookMarkIcon from "@/shared/assets/icons/bookmark.svg?react";
import LogOutIcon from "@/shared/assets/icons/log-out.svg?react";
import HomeIcon from "@/shared/assets/icons/house.svg?react";
import CircleNotif from '@/shared/assets/icons/circle.svg?react'
import CloseIcon from '@/shared/assets/icons/x-icon.svg?react'
import ProfileIcon from "@/shared/assets/icons/circle-user-round.svg?react";
import NotificationIcon from "@/shared/assets/icons/bell.svg?react";
import FollowIcon from "@/shared/assets/icons/user-round-plus.svg?react";
import { selectorIsShow } from "@/app/store/header/headerSelectors";
import { actionMenu, closeMenu } from "@/app/store/header/headerSlice";
import { selectCurrentUser } from "@/app/store/authentication/authSelectors";
import { useMediaQuery } from "@/hooks/useMedia";
import ModalWindow from "../Modal/Modal";
import {
  Heder,
  Name,
  HeaderWrapper,
  MenuMiddleWrapper,
  LogoWrapper,
  IconWrapper,
  HeaderSearch,
  MenuSideWrapper,
  LogoType,
  Title,
  MenuItem,
  LogOutButton,
  TitleMob,
  CloseButton,
  MenuOverlay
} from "./HeaderStyled";
import MobileLogo from "@/shared/assets/logo/logotype.svg?react";
import { selectAllNotificationsCount } from "@/app/store/notifications/notificationsSelector";
import { setSearchValue } from "@/app/store/search/searchSlice";
import { logout } from "@/app/store/authentication/authSlice";


export default function AuthMenu() {
  const isShow = useSelector(selectorIsShow);
  const currentUser = useSelector(selectCurrentUser);
  const unCountNotifications = useSelector(selectAllNotificationsCount)
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 769px)");
   
  function showBurgerMenu() {
    dispatch(actionMenu());
  }
  const handleProfileClick = (e) => {
    e.preventDefault();
    if (currentUser?.id) {
      navigate(`/users/${currentUser.id}`);
    } else {
      navigate("/profile");
    }
    dispatch(closeMenu());
  };
  const menuItems = [
    { path: "/", name: "Головна", icon: <HomeIcon /> },
    { path: "/favorite", name: "Збережені", icon: <BookMarkIcon /> },
    { path: "/follow", name: "Підписки", icon: <FollowIcon /> },
    {
      path: "/profile",
      name: "Профіль",
      icon: <ProfileIcon />,
      isCustom: true,
    },
    { path: "/chat", name: "Месенджер", icon: <SmsIcon /> },
    {
      path: "/notifications",
      name: "Сповіщення",
      icon: <NotificationIcon />,
    },
  ];
  function closeModal() {
    setModal(!modal);
  }
  function logOut() {
    dispatch(logout());
  }
  return (
    <>
      {modal && (
        <ModalWindow
          logo
          title="Вийти з Tereveni?"
          desc="Ви завжди можете знову увійти в систему в будь-який час."
          closeModal={closeModal}
          isOpen={modal}
          primaryText="Так"
          secondaryText="Відміна"
          primaryClick={logOut}
          secondaryClick={closeModal}
        />
      )}
      {isMobile && (
        <Heder>
          <HeaderWrapper>
            <Link to="/">
              <LogoWrapper>
                <LogoType>
                  <MobileLogo />
                </LogoType>
                <Title>Tereveni</Title>
              </LogoWrapper>
            </Link>
            <HeaderSearch
              size="10"
              placeholder="Пошук поста..."
              onChange={(e) => dispatch(setSearchValue(e.target.value))}
            />
            <MenuIcon onClick={showBurgerMenu} />
            {isShow && (
              <>
                <MenuOverlay onClick={() => dispatch(closeMenu())} />
                <MenuMiddleWrapper>
                  <CloseButton onClick={() => dispatch(closeMenu())}><CloseIcon /></CloseButton>
                  <Link to="/" onClick={() => dispatch(closeMenu())}>
                    <LogoWrapper>
                      <LogoType>
                        <MobileLogo />
                      </LogoType>
                      <TitleMob>Tereveni</TitleMob>
                    </LogoWrapper>
                  </Link>
                  {menuItems.map((item) => (
                    <div key={item.path}>
                      <MenuItem
                        to={item.path}
                        onClick={() => dispatch(closeMenu())}
                      >
                        {item.path === '/notifications' && unCountNotifications>0 && <CircleNotif/>}
                        {item.icon}
                        {item.name}
                      </MenuItem>
                    </div>
                  ))}
                  <LogOutButton
                    style={{ marginBottom: "0px" }}
                    onClick={() => {
                      (closeModal(), dispatch(closeMenu()));
                    }}
                  >
                    <LogOutIcon />
                    LogOut
                  </LogOutButton>
                </MenuMiddleWrapper>
              </>
            )}
          </HeaderWrapper>
        </Heder>
      )}
      {isDesktop && (
        <Heder>
          <HeaderWrapper>
            <Link to="/">
              <LogoWrapper>
                <LogoType>
                  <MobileLogo />
                </LogoType>
                <Title>Tereveni</Title>
              </LogoWrapper>
            </Link>
            <HeaderSearch
              size="10"
              placeholder="Пошук поста..."
              onChange={(e) => dispatch(setSearchValue(e.target.value))}
            />
            {isMobile && <MenuIcon onClick={showBurgerMenu} />}
            {isShow && (
              <MenuMiddleWrapper>
                {menuItems.map((item) => (
                  <div key={item.path}>
                    {item.isCustom ? (
                      <Link
                        to={item.path}
                        onClick={(e) => {
                          handleProfileClick(e);
                          dispatch(closeMenu());
                        }
                      }
                      >
                        {item.path === '/notifications' && unCountNotifications>0 && <CircleNotif/>}
                        {item.icon}
                        {item.name}
                      </Link>
                    ) : (
                      <NavLink
                        to={item.path}
                        onClick={() => dispatch(closeMenu())}
                      >
                        {item.icon}
                        {item.name}
                      </NavLink>
                    )}
                  </div>
                ))}
                <Link
                  onClick={() => {
                    (closeModal(), dispatch(closeMenu()));
                  }}
                >
                  <LogOutIcon />
                  Вийти
                </Link>
              </MenuMiddleWrapper>
            )}
            <MenuMiddleWrapper>
              {menuItems.slice(0, 3).map((item) => (
                <div key={item.path}>
                  {item.isCustom ? (
                    <Link to={item.path} onClick={handleProfileClick}>
                      <IconWrapper>
                        {item.icon}
                        <Name>{item.name}</Name>
                      </IconWrapper>
                    </Link>
                  ) : (
                    <NavLink to={item.path}>
                      <IconWrapper>
                        {item.icon}
                        <Name>{item.name}</Name>
                      </IconWrapper>
                    </NavLink>
                  )}
                </div>
              ))}
            </MenuMiddleWrapper>
            <MenuSideWrapper>
              {menuItems.slice(3, 6).map((item) => (
                <div key={item.path}>
                  {item.isCustom ? (
                    <NavLink to={`/users/${currentUser.id}`} onClick={handleProfileClick}>
                      <IconWrapper >
                        {item.path === '/notifications' && unCountNotifications>0 && <CircleNotif/>}
                        {item.icon}
                        <Name>{item.name}</Name>
                      </IconWrapper>
                    </NavLink>
                  ) : (
                    <NavLink to={item.path}>
                      <IconWrapper>
                        {item.path === '/notifications' && unCountNotifications>0 && <CircleNotif/>}
                        {item.icon}
                        <Name>{item.name}</Name>
                      </IconWrapper>
                    </NavLink>
                  )}
                </div>
              ))}
              <Link onClick={() => closeModal()}>
                <IconWrapper $logOut>
                  <LogOutIcon />
                  <Name>Вийти</Name>
                </IconWrapper>
              </Link>
            </MenuSideWrapper>
          </HeaderWrapper>
        </Heder>
      )}
    </>
  );
}
