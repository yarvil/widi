import { Link } from "react-router-dom";
import styled from "styled-components";

export const UserCardWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid #2f3336;
`;

export const UserInformation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  gap: 10px;
`;
export const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 5px;
`;

export const UserName = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserFullName = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  margin-block: 0 5px;
  &:hover {
    text-decoration: underline;
  }
`;

export const Counters = styled.p`
  color: #6e767d;
  font-size: 15px;
  margin: 0;
`;

export const Nickname = styled.span`
  color: #6e767d;
  font-size: 15px;
`;
