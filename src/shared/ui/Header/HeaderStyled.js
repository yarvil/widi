import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const LogoType = styled.div`
  svg {
    height: 50px;
    width: auto;
  }
`;

export const IconWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: rgba(39, 44, 48, 0.75);
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-4px);
  }
`;
export const Name = styled.span`
  position: absolute;
  bottom: -42px;
  left: 50%;
  transform: translateX(-50%);
  background: #1c1e21;
  color: #fff;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 8px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
`;

export const Heder = styled.header`
  position: sticky;
  top: 0;
  z-index: 99;
  background: #000;
  border-bottom: 1px solid #2f3336;
  padding-block: 10px;
  a {
    text-decoration: none;
    color: #fff;
    border: 1px solid #000;
    background: #000;
    border-radius: 10px;
    display: flex;
    align-items: center;
    /* padding: 10px; */
  }
`;
export const HeaderWrapper = styled.div`
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  padding: 5px;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 769px) {
    justify-content: center;
    gap: 35px;
  }
`;
export const MenuSideWrapper = styled.div`
  display: flex;
  gap: 5px;
  .active {
    color: ${(props) =>
      props.$logOut ? "rgb(244, 33, 46)" : "rgb(29, 155, 240)"};
  }
  
`;

export const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,0.4); 
  z-index: 90;
`;

export const HeaderSearch = styled.input`
  width: 180px;
  padding: 8px 35px 8px 12px;
  border-radius: 20px;
  border: none;
  background-color: #1e1e1e;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition:
    box-shadow 0.2s ease,
    background-color 0.2s ease;
  background-image: url(https://cdn-icons-png.flaticon.com/128/17216/17216943.png);
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px 16px;
  &:placeholder {
    color: #aaa;
    font-size: 18px;
  }
  &:focus {
    background-color: #2a2a2a;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  }
  @media (max-width: 768px) {
    width: 150px;
    font-size: 12px;
    background-size: 16px 16px;
    
  }
`;

export const CloseButton = styled.button`
position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: rotate(90deg);
  }

  svg {
    width: 20px;
    height: 20px;
    stroke: #fff;
    stroke-width: 2;
  }
`;


export const MenuMiddleWrapper = styled.div`
 display: flex;
  flex-direction: column;
  position:relative;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 280px;
    height: 100vh;
    background: #000;
    padding: 80px 20px 20px;
    gap: 8px;
    border-left: 1px solid #2f3336;
    z-index:100;
  }

  @media (min-width: 769px) {
    position: static;
    flex-direction: row;
    height: auto;
    padding: 0;
    width: auto;
    border: none;
  }
  .active {
    color: rgb(29, 155, 240);
  }
`;
export const LogOutButton = styled.button`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #f4212e;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background: rgba(244, 33, 46, 0.1);
  }
`;
export const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  font-size: 18px;
  font-weight: 500;
  color: #e7e9ea;
  transition: background 0.2s ease;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 32px;
  font-family: "Style Script", cursive;
  margin-block: 0;
  @media(max-width:500px){
  display:none;
  }
`;
export const TitleMob = styled.h1`
font-size: 32px;
  font-family: "Style Script", cursive;
  margin-block: 0;
`

export const ModalText = styled.p`
  color: rgb(231, 233, 234);
`;
