import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import MainIconSvg from "@/shared/assets/logo/WiDi.svg?react";
import SmsIcon from "@/shared/assets/icons/mail.svg?react";
import MenuIcon from "@/shared/assets/icons/menu.svg?react";
import BookMarkIcon from "@/shared/assets/icons/bookmark.svg?react";
import LogOutIcon from "@/shared/assets/icons/log-out.svg?react";
import HomeIcon from "@/shared/assets/icons/house.svg?react";
import ProfileIcon from "@/shared/assets/icons/circle-user-round.svg?react";
import NotificationIcon from "@/shared/assets/icons/bell.svg?react";
import FollowIcon from "@/shared/assets/icons/user-round-plus.svg?react";
import { selectorIsShow } from "@/app/store/header/headerSelectors";
import { actionMenu, closeMenu } from "@/app/store/header/headerSlice";
import { useMediaQuery } from "@/hooks/useMedia";
import ModalWindow from "../Modal/Modal";
import {
  Heder,
  Name,
  HeaderWrapper,
  MenuMiddleWrapper,
  LogoWrapper,
  // Title,
  IconWrapper,
  HeaderSearch,
  MenuSideWrapper,
  SubmitBtn,
  CancelBtn,
  LogoType,
} from "./HeaderStyled";
import mobileLogo from "@/shared/assets/logo/logo.png";
import desktopLogo from "@/shared/assets/logo/logo-2.png";

import { setSearchValue } from "@/app/store/search/searchSlice";
import { logout } from "@/app/store/authentication/authSlice";

export default function AuthMenu() {
  const isShow = useSelector(selectorIsShow);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  function showBurgerMenu() {
    dispatch(actionMenu());
  }
  const menuItems = [
    { path: "/", name: "Home Page", icon: <HomeIcon /> },
    { path: "/favorite", name: "Bookmarks", icon: <BookMarkIcon /> },
    { path: "/follow", name: "Follow", icon: <FollowIcon /> },
    { path: "/users/:id", name: "Profile", icon: <ProfileIcon /> },
    { path: "/chat", name: "Messenger", icon: <SmsIcon /> },
    {
      path: "/notifications",
      name: "Notifications",
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
      <ModalWindow closeModal={closeModal} isOpen={modal}>
        <p style={{ color: "#fff" }}>Do you really want to exit Tereveni?</p>
        <SubmitBtn onClick={logOut}>Yes</SubmitBtn>
        <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
      </ModalWindow>
      {isMobile && (
        <Heder>
          <HeaderWrapper>
            <LogoWrapper>
              <NavLink to="/">
                <LogoType>
                  <img
                    src={mobileLogo}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </LogoType>
                {/* <MainIconSvg /> */}
                {/* <Title>WiDi</Title> */}
              </NavLink>
              <HeaderSearch
                size="10"
                placeholder="Search Post..."
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
              />
            </LogoWrapper>
            <MenuIcon onClick={showBurgerMenu} />
            {isShow && (
              <MenuMiddleWrapper>
                {menuItems.map((item) => (
                  <div key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => dispatch(closeMenu())}
                    >
                      {item.icon}
                      {item.name}
                    </NavLink>
                  </div>
                ))}
                <Link
                  onClick={() => {
                    (closeModal(), dispatch(closeMenu()));
                  }}
                >
                  <LogOutIcon />
                  LogOut
                </Link>
              </MenuMiddleWrapper>
            )}
          </HeaderWrapper>
        </Heder>
      )}
      {isTablet && (
        <Heder>
          <HeaderWrapper>
            <LogoWrapper>
              <Link to="/">
                <LogoType>
                  <img
                    src={desktopLogo}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </LogoType>
              </Link>
              <HeaderSearch
                size="10"
                placeholder="Search Post..."
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
              />
            </LogoWrapper>
            <MenuMiddleWrapper>
              {menuItems.slice(0, 3).map((item) => (
                <div key={item.path}>
                  <NavLink to={item.path}>
                    <IconWrapper>
                      {item.icon}
                      <Name>{item.name}</Name>
                    </IconWrapper>
                  </NavLink>
                </div>
              ))}
            </MenuMiddleWrapper>
            <MenuSideWrapper>
              {menuItems.slice(3, 6).map((item) => (
                <div key={item.path}>
                  <NavLink to={item.path}>
                    <IconWrapper>
                      {item.icon}
                      <Name>{item.name}</Name>
                    </IconWrapper>
                  </NavLink>
                </div>
              ))}
              <Link onClick={() => closeModal()}>
                <IconWrapper>
                  <LogOutIcon />
                  <Name>LogOut</Name>
                </IconWrapper>
              </Link>
            </MenuSideWrapper>
          </HeaderWrapper>
        </Heder>
      )}
      {isDesktop && (
        <Heder>
          <HeaderWrapper>
            <LogoWrapper>
              <Link to="/">
                <LogoType>
                  <img
                    src={desktopLogo}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </LogoType>
                {/* <MainIconSvg /> */}
                {/* <Title>Tereveni</Title> */}
              </Link>
              <HeaderSearch
                size="10"
                placeholder="Search Post..."
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
              />
            </LogoWrapper>
            <MenuMiddleWrapper>
              {menuItems.slice(0, 3).map((item) => (
                <div key={item.path}>
                  <NavLink to={item.path}>
                    <IconWrapper>
                      {item.icon}
                      <Name>{item.name}</Name>
                    </IconWrapper>
                  </NavLink>
                </div>
              ))}
            </MenuMiddleWrapper>
            <MenuSideWrapper>
              {menuItems.slice(3, 6).map((item) => (
                <div key={item.path}>
                  <NavLink to={item.path}>
                    <IconWrapper>
                      {item.icon}
                      <Name>{item.name}</Name>
                    </IconWrapper>
                  </NavLink>
                </div>
              ))}
              <Link onClick={() => closeModal()}>
                <IconWrapper $logOut>
                  <LogOutIcon />
                  <Name>LogOut</Name>
                </IconWrapper>
              </Link>
            </MenuSideWrapper>
          </HeaderWrapper>
        </Heder>
      )}
    </>
  );
}
