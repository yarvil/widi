import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavigationLink = styled(NavLink)`
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #1e9ee3;

  &:hover {
    color: #1169c7;
  }
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
