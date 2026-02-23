import styled from "styled-components";

export const MenuWrapper = styled.div`
  position: relative;
`;

export const ChevronWrapper = styled.span`
  padding: 0;
  margin-left: 4px;
  display: flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: -65px;
  background: #000;
  border: 1px solid #2f3336;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
  min-width: 140px;
  z-index: 10;
  overflow: hidden;
  margin-top: 8px;
`;

export const DropDownMenuHeader = styled.div`
  cursor: default;
  padding: 16px 20px;
  border-bottom: 1px solid rgb(47, 51, 54);
  span {
    font-weight: 400;
    color: rgb(113, 118, 123);
  }
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: #e7e9ea;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  transition: 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  svg {
    width: 18px;
    height: 18px;
    color: rgb(29, 155, 240);
  }
`;
