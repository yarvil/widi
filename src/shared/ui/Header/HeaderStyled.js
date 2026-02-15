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
  z-index: 1000;
  background: #000;
  border-bottom: 1px solid #2f3336;
  a {
    text-decoration: none;
    color: #fff;
    border: 1px solid #000;
    background: #000;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 10px;
  }
`;
export const HeaderWrapper = styled.div`
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  padding: 5px;
  align-items: center;
  justify-content: space-between;
`;
export const MenuSideWrapper = styled.div`
  display: flex;
  gap: 5px;
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
    &:placeholder {
      color: #aaa;
      font-size: 12px;
    }
  }
`;
export const MenuMiddleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  right: 10px;
  gap: 5px;
  @media (min-width: 769px) {
    flex-direction: row;
    position: static;
  }
`;
export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
export const SubmitBtn = styled.div`
    color: #000;
    background-color: #fff;
    border: 1px solid #2f3336;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom:10px;
`
export const CancelBtn = styled(SubmitBtn)`
    color: #fff;
    background-color: #000;
    margin-top: 0;
    margin-bottom:0;
`
export const Title = styled.h1`
  color: #fff;
  font-size: 20px;
`;
