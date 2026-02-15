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

export const UserId = styled.p`
  color: #6e767d;
  font-size: 15px;
  margin: 0;
`;

export const FollowButton = styled.button`
  border-radius: 36px;
  padding: 9px 16px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border: transparent;
  background-color: rgb(239, 243, 244);
  transition: 0.2s;

  &:disabled {
    color: #000;
    opacity: 0.5;
    cursor: auto;
  }
  &:not(:disabled):hover {
    background-color: rgb(215, 219, 220);
  }
`;
