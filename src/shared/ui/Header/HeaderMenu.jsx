import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "./HeaderStyled";
import MobileLogo from "@/shared/assets/logo/logotype.svg?react";

import { setSearchValue } from "@/app/store/search/searchSlice";
import { logoutThunk } from "@/app/store/authentication/authSlice";

export default function AuthMenu() {
  const isShow = useSelector(selectorIsShow);
  const currentUser = useSelector(selectCurrentUser);
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
    { path: "/", name: "Home Page", icon: <HomeIcon /> },
    { path: "/favorite", name: "Bookmarks", icon: <BookMarkIcon /> },
    { path: "/follow", name: "Follow", icon: <FollowIcon /> },
    {
      path: "/profile",
      name: "Profile",
      icon: <ProfileIcon />,
      isCustom: true,
    },
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
  async function logOut() {
    await dispatch(logoutThunk()).unwrap();
    navigate("/auth");
  }
  return (
    <>
      {modal && (
        <ModalWindow
          logo
          title="Log out of Tereveni?"
          desc="You can always log back in at any time."
          closeModal={closeModal}
          isOpen={modal}
          primaryText="Yes"
          secondaryText="Cancel"
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
              placeholder="Search Post..."
              onChange={(e) => dispatch(setSearchValue(e.target.value))}
            />
            <MenuIcon onClick={showBurgerMenu} />
            {isShow && (
              <MenuMiddleWrapper>
                <Link to="/" onClick={() => dispatch(closeMenu())}>
                  <LogoWrapper>
                    <LogoType>
                      <MobileLogo />
                    </LogoType>
                    <Title>Tereveni</Title>
                  </LogoWrapper>
                </Link>
                {menuItems.map((item) => (
                  <div key={item.path}>
                    <MenuItem
                      to={item.path}
                      onClick={() => dispatch(closeMenu())}
                    >
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
              placeholder="Search Post..."
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
                        }}
                      >
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
                  LogOut
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
