import styled from "styled-components";

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
    background: #808080;
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-4px);
  }

`
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

  transition: opacity 0.15s ease, transform 0.15s ease;
`


export const Heder = styled.header`
  position:sticky;
  top: 0;
  z-index: 1000;
  background: #000;
  border-bottom: 1px solid #808080;
  a{
  text-decoration: none;
  color: #fff;
  border: 1px solid #000;
  background: #000;
  border-radius: 10px;
  display:flex;
  align-items:center;
  padding:10px;
  
  }
  `
export const HeaderWrapper = styled.div`
  display: flex;
  align-items:center;
  justify-content:space-between;
  `
export const MenuSideWrapper = styled.div`
  display:flex;
  gap:5px;
  `
export const HeaderSearch = styled.input`
  border-radius:10px;
  `
export const MenuMiddleWrapper = styled.div`
  display:flex;
  flex-direction:column;
  position:absolute;
  top:50px;
  right:10px;
  gap:5px;
  @media(min-width:769px){
  flex-direction:row;
  position:static;
  }
  `
export const LogoWrapper = styled.div`
  display: flex;
  align-items:center;
  gap:10px;
  @media(min-width:769px){
  }
  `
export const Title = styled.h1`
  color: #fff;
  font-size: 20px;
  `