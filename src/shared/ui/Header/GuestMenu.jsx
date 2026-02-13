import { NavLink } from "react-router-dom";
import React from "react";
import { useMediaQuery } from "@/hooks/useMedia";
export default function GuestMenu() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  return (
    <>
      {isMobile && <NavLink to="/auth"> </NavLink>}
      {isTablet && <NavLink to="/auth"></NavLink>}
      {isDesktop && <NavLink to="/auth"></NavLink>}
    </>
  );
}
