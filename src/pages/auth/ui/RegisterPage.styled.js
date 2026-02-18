import styled from "styled-components";

export const Option = styled.option`
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: black;
  padding: 10px;
  cursor: pointer;
  max-height: 50px;
  overflow-y: scroll;
  scrollbar-width: thin;

  ${({ $style = "" }) => $style};
`;

export const Select = styled.select`
  border-radius: 4px;
  border: 2px solid #8282822e;
  background-color: transparent;
  color: white;
  width: 100%;
  flex: 1 1 auto;
  padding: clamp(12px, 3vw, 18px) clamp(0px, 1vw, 4px) clamp(4px, 1vw, 8px)
    clamp(0px, 1vw, 4px);
  font-size: clamp(12px, 2.4vw, 16px);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 4px;
    border: 2px solid #ffffff;
  }

  &:focus {
    border: 2px solid rgb(29, 155, 240);
  }

  ${({ $isError }) =>
    $isError &&
    `
        border: 2px solid red;

        &:focus {
            border: 2px solid red;
        }
    `};

  ${({ $style = "" }) => $style};
`;

export const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: clamp(6px, 2vw, 12px);
  flex: 1 1 auto;
`;
