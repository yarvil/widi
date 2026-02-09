import { NavLink } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import MainLogoSvg from '../../image/WiDi.svg?react'
import MenuLogo from '../../image/menu.svg?react'
import LogIn from '../../image/login.svg?react'
import SearchLogo from '../../image/search.svg?react'
import HomeLogo from '../../image/home.svg?react'
import { selectorIsShow } from "@/app/store/header/headerSelectors";
import { useSelector } from "react-redux";
import { actionMenu } from "@/app/store/header/headerSlice";

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

} from './HeaderStyled'
import { setSearchValue } from "@/app/store/search/searchSlice";

export default function GuestMenu() {
    const isShow = useSelector(selectorIsShow)
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
                <NavLink to='/auth'> </NavLink>
            )}
            {isTablet && (

                <NavLink to='/auth'></NavLink>

            )}
            {isDesktop && (
                <NavLink to='/auth'></NavLink>
            )}
        </>

    )
}