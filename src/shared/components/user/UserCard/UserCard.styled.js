import styled from "styled-components";

export const UserCardWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #2f3336;
`;

export const UserInformation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export const UserFullName = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-block: 0 5px;
`;

export const Counters = styled.p`
  color: #6e767d;
  font-size: 15px;
  margin: 0;
`;
