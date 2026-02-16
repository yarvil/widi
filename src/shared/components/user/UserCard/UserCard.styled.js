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

export const FollowButton = styled.button`
  border-radius: 36px;
  padding: 9px 16px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border: transparent;
  transition: 0.2s;

  .hover-text {
    display: none;
  }

  ${(props) =>
    props.$following &&
    `
    color: rgb(239, 243, 244);
    border: 1px solid rgb(83, 100, 113);
    background-color: transparent;
    min-width: 100px;
  `}

  &:hover {
    background-color: rgb(215, 219, 220);

    ${(props) =>
      props.$following &&
      `
     color: rgb(244, 33, 46);
     border: 1px solid rgb(103, 7, 15);
     background-color: rgba(244, 33, 46, 0.1);

     .default-text {
        display: none;
      }
      
    .hover-text {
        display: inline;
      }
    
  `}
  }
`;
