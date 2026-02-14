import styled from "styled-components";

export const MoreButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  color: #71767b;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(25%, -50%);

  &:hover {
    background-color: rgba(29, 155, 240, 0.1);
    color: rgb(29, 155, 240);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: #000;
  border: 1px solid #2f3336;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
  min-width: 180px;
  z-index: 10;
  overflow: hidden;
`;

export const MenuItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: ${(props) => (props.$danger ? "#f4212e" : "#e7e9ea")};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  transition: 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }
`;
