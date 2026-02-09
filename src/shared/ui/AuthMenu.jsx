import { NavLink } from "react-router-dom";
import React ,{useState} from "react";
import { useDispatch } from "react-redux";
import MainLogoSvg from '../../image/WiDi.svg?react'
import MenuLogo from '../../image/menu.svg?react'
import PostLogo from '../../image/posts.svg?react'
import FavsLogo from '../../image/favorite.svg?react'
import LogOut from '../../image/logout.svg?react'
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
import { selectorFavorites } from "@/app/store/favorite/favoriteSelector";
import { clearFavorites } from "@/app/store/favorite/favoriteSlice";
import ModalWindow from "./Modal";
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
import { logout } from "@/app/store/authentication/authSlice";

export default function AuthMenu() {
    const isShow = useSelector(selectorIsShow)
    const hasNew = useSelector(selectorNotifications)
    const [modal, setModal] = useState(false)
    const hasNewFavs = useSelector(selectorFavorites)
    const dispatch = useDispatch()
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
    const isDesktop = useMediaQuery("(min-width: 1025px)");
    function showBurgerMenu() {
        dispatch(actionMenu())
    }
    function closeModal(){
        setModal(!modal)
    }
    function logOut(){
        dispatch(logout())
    }
    return (
        <>
            <ModalWindow closeModal={closeModal} isOpen={modal} logOut={logOut} />
            {isMobile && (
                <Heder>
                    <HeaderWrapper>
                        <LogoWrapper>
                            <MainLogoSvg />
                            <Title>WiDi</Title>
                            <HeaderSearch size="10" placeholder="Search Post..." onChange={(e) => dispatch(setSearchValue(e.target.value))} />
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
                                <NavLink to='/chat'>
                                    <SmsLogo />
                                    Messenger
                                </NavLink>
                                <NavLink to='/posts'>
                                    <PostLogo/>
                                    Posts
                                </NavLink>
                                <NavLink to='/favorite' onClick={() => dispatch(clearFavorites())}>
                                    {(hasNewFavs &&
                                        (
                                            <>
                                                <CircleNotif />
                                                <FavsLogo />
                                            </>
                                        )
                                    )}
                                    {(!hasNewFavs &&
                                        (
                                            <>
                                                <FavsLogo />
                                            </>
                                        )
                                    )}
                                    Favorite
                                </NavLink>
                                <NavLink to='/notifications' onClick={() => dispatch(clearNotifications())}>
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
                                <NavLink   onClick={()=>closeModal()}>
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
                            <HeaderSearch size="10" placeholder="Search Post..." onChange={(e) => dispatch(setSearchValue(e.target.value))} />
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
                            <NavLink to='/posts'>
                                <IconWrapper>
                                    <PostLogo />
                                    <Name>
                                        Posts
                                    </Name>
                                </IconWrapper>
                            </NavLink>
                            <NavLink to='/favorite' onClick={() => dispatch(clearFavorites())}>
                                {(hasNewFavs &&
                                    (
                                        <>
                                            <IconWrapper>
                                                <FavsLogo />
                                                <CircleNotif />
                                                <Name>
                                                    Favorite
                                                </Name>
                                            </IconWrapper>
                                        </>
                                    )
                                )}
                                {(!hasNewFavs &&
                                    (
                                        <>
                                            <IconWrapper>
                                                <FavsLogo />
                                                <Name>
                                                    Favorite
                                                </Name>
                                            </IconWrapper>
                                        </>
                                    )
                                )}
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
                            <NavLink to='/chat'>
                                <IconWrapper>
                                    <SmsLogo />
                                    <Name>
                                        Messenger
                                    </Name>
                                </IconWrapper>
                            </NavLink>
                            <NavLink to='/notifications' onClick={() => dispatch(clearNotifications())}>
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
                            <NavLink  onClick={()=>closeModal()}>
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
                            <HeaderSearch size="10" placeholder="Search Post..." onChange={(e) => dispatch(setSearchValue(e.target.value))} />
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
                            <NavLink to='/posts'>
                                <IconWrapper>
                                    <PostLogo />
                                    <Name>
                                        Posts
                                    </Name>
                                </IconWrapper>
                            </NavLink>
                            <NavLink to='/favorite' onClick={() => dispatch(clearFavorites())}>
                                {(hasNewFavs &&
                                    (
                                        <>
                                            <IconWrapper>
                                                <FavsLogo />
                                                <CircleNotif />
                                                <Name>
                                                    Favorite
                                                </Name>
                                            </IconWrapper>
                                        </>
                                    )
                                )}
                                {(!hasNewFavs &&
                                    (
                                        <>
                                            <IconWrapper>
                                                <FavsLogo />
                                                <Name>
                                                    Favorite
                                                </Name>
                                            </IconWrapper>
                                        </>
                                    )
                                )}
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
                            <NavLink to='/chat'>
                                <IconWrapper>
                                    <SmsLogo />
                                    <Name>
                                        Messenger
                                    </Name>
                                </IconWrapper>
                            </NavLink>
                            <NavLink to='/notifications' onClick={() => dispatch(clearNotifications())}>
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
                            <NavLink  onClick={()=>closeModal()}>
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


    )




}
