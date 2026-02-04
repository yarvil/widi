import { NavLink } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import MainLogoSvg from '../../image/WiDi.svg?react'
import MenuLogo from '../../image/menu.svg?react'
import PostLogo from '../../image/posts.svg?react'
import FavsLogo from '../../image/favorite.svg?react'
import LogOut from '../../image/logout.svg?react'
import SearchLogo from '../../image/search.svg?react'
import HomeLogo from '../../image/home.svg?react'
import ProfileLogo from '../../image/profile.svg?react'
import NotificationLogo from '../../image/notifications.svg?react'
import SmsLogo from '../../image/sms.svg?react'
import CircleNotif from '../../image/circle.svg?react'
import { selectorIsShow } from "@/app/store/header/headerSelectors";
import { useSelector } from "react-redux";
import { actionMenu } from "@/app/store/header/headerSlice";
import { selectorNotifications } from "@/app/store/notifications/notificationsSelector";
import { clearNotifications } from "@/app/store/notifications/notificationsSlice";
import { useMediaQuery } from "./UseMedia";
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

} from './HeaderStyled'
import { setSearchValue } from "@/app/store/search/searchSlice";

export default function Header() {
  const isShow = useSelector(selectorIsShow)
  const hasNew = useSelector(selectorNotifications)
  const dispatch = useDispatch()
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  function showBurgerMenu() {
    dispatch(actionMenu())
  }
  return (
    <>
      {isMobile && (
        <Heder>
          <HeaderWrapper>
            <LogoWrapper>
              <MainLogoSvg />
              <Title>WiDi</Title>
              <SearchLogo />
              <HeaderSearch size="10" placeholder="Search" onChange={(e) => dispatch(setSearchValue(e.target.value))} />
            </LogoWrapper>
            <MenuLogo onClick={showBurgerMenu} />
            {isShow && (
              <MenuMiddleWrapper>
                <NavLink to='/'>
                  <HomeLogo />
                  Home Page
                </NavLink>
                <NavLink to='/users/:id'>
                  <ProfileLogo />
                  Profile
                </NavLink>
                <NavLink to='/users/:id/chat'>
                  <SmsLogo />
                  Messenger
                </NavLink>
                <NavLink to='/post/:postId'>
                  <PostLogo />
                  Posts
                </NavLink>
                <NavLink to='/users/:id/favorite'>
                  <FavsLogo />
                  Favorite
                </NavLink>
                <NavLink to='/users/:id/notifications' onClick={() => dispatch(clearNotifications())}>
                  {(hasNew &&
                    (
                      <>
                        <CircleNotif />
                        <NotificationLogo />
                      </>
                    )
                  )}
                  {(!hasNew &&
                    (
                      <>
                        <NotificationLogo />
                      </>
                    )
                  )}
                  Notifications
                </NavLink>
                <NavLink to='/users/:id/logout'>
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
              <MainLogoSvg />
              <Title>WiDi</Title>
              <SearchLogo />
              <HeaderSearch size="10" placeholder="Search" onChange={(e) => dispatch(setSearchValue(e.target.value))} />
            </LogoWrapper>
            <MenuMiddleWrapper>
              <NavLink to='/'>
                <IconWrapper>
                  <HomeLogo />
                  <Name>
                    Home Page
                  </Name>
                </IconWrapper>
              </NavLink>
              <NavLink to='/post/:postId'>
                <IconWrapper>
                  <PostLogo />
                  <Name>
                    Posts
                  </Name>
                </IconWrapper>
              </NavLink>
              <NavLink to='/users/:id/favorite'>
                <IconWrapper>
                  <FavsLogo />
                  <Name>
                    Favorite
                  </Name>
                </IconWrapper>
              </NavLink>
            </MenuMiddleWrapper>
            <MenuSideWrapper>
              <NavLink to='/users/:id'>
                <IconWrapper>
                  <ProfileLogo />
                  <Name>
                    Profile
                  </Name>
                </IconWrapper>
              </NavLink>
              <NavLink to='/users/:id/chat'>
                <IconWrapper>
                  <SmsLogo />
                  <Name>
                    Messenger
                  </Name>
                </IconWrapper>
              </NavLink>
              <NavLink to='/users/:id/notifications' onClick={() => dispatch(clearNotifications())}>
                {(hasNew &&
                  (
                    <>
                      <IconWrapper>
                        <NotificationLogo />
                        <CircleNotif />
                        <Name>
                          Notifications
                        </Name>
                      </IconWrapper>
                    </>
                  )
                )}
                {(!hasNew &&
                  (
                    <>
                      <IconWrapper>
                        <NotificationLogo />
                        <Name>
                          Notifications
                        </Name>
                      </IconWrapper>
                    </>
                  )
                )}

              </NavLink>
              <NavLink to='/users/:id/logout'>
                <IconWrapper>
                  <LogOut />
                  <Name>
                    LogOut
                  </Name>
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
              <MainLogoSvg />
              <Title>WiDi</Title>
              <SearchLogo />
              <HeaderSearch size="10" placeholder="Search" onChange={(e) => dispatch(setSearchValue(e.target.value))} />
            </LogoWrapper>
            <MenuMiddleWrapper>
              <NavLink to='/'>
                <IconWrapper>
                  <HomeLogo />
                  <Name>
                    Home Page
                  </Name>
                </IconWrapper>
              </NavLink>
              <NavLink to='/post/:postId'>
                <IconWrapper>
                  <PostLogo />
                  <Name>
                    Posts
                  </Name>
                </IconWrapper>
              </NavLink>
              <NavLink to='/users/:id/favorite'>
                <IconWrapper>
                  <FavsLogo />
                  <Name>
                    Favorite
                  </Name>

                </IconWrapper>
              </NavLink>
            </MenuMiddleWrapper>
            <MenuSideWrapper>
              <NavLink to='/users/:id'>
                <IconWrapper>
                  <ProfileLogo />
                  <Name>
                    Profile
                  </Name>
                </IconWrapper>
              </NavLink>
              <NavLink to='/users/:id/chat'>
                <IconWrapper>
                  <SmsLogo />
                  <Name>
                    Messenger
                  </Name>
                </IconWrapper>
              </NavLink>
              <NavLink to='/users/:id/notifications' onClick={() => dispatch(clearNotifications())}>
                {(hasNew &&
                  (
                    <>
                      <IconWrapper>
                        <NotificationLogo />
                        <CircleNotif />
                        <Name>
                          Notifications
                        </Name>
                      </IconWrapper>
                    </>
                  )
                )}
                {(!hasNew &&
                  (
                    <>
                      <IconWrapper>
                        <NotificationLogo />
                        <Name>
                          Notifications

                        </Name>
                      </IconWrapper>
                    </>
                  )
                )}

              </NavLink>
              <NavLink to='/users/:id/logout'>
                <IconWrapper>
                  <LogOut />
                  <Name>
                    LogOut
                  </Name>
                </IconWrapper>
              </NavLink>
            </MenuSideWrapper>
          </HeaderWrapper>
        </Heder>
      )}
    </>
  );
}


// import { NavLink } from "react-router-dom";
// import "./Header.scss";

// export default function Header() {
//   return (
//     <header className="header">
//       <NavLink to="/">Home page</NavLink>
//       <NavLink to="/users/:id">User page</NavLink>
//       <NavLink to="/auth">Login page</NavLink>
//     </header>
//   );
// }
