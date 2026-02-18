import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const WrapperPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline: 16px;
  height: 100vh;
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  position: relative;
  padding: 20px;
  border: 1px solid #ccc;

  border-radius: 10px;
  width: 380px;
`;

export const Form = styled.form`
  display: flex;
  gap: 5px;
  flex-direction: column;
  padding-inline: 15px;
  margin-bottom: 10px;
`;

export const Legend = styled.legend`
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: 500;
  letter-spacing: 1px;
`;

export const Input = styled.input`
  outline: none;
  border: 2px solid #8282822e;
  color: white;
  background-color: transparent;
  border-radius: 5px;
  padding: clamp(12px, 2.5vw, 20px) clamp(12px, 3vw, 20px) clamp(6px, 1vw, 8px)
    clamp(10px, 2.5vw, 14px);
  transition: all 0.3s ease;

  &[type="password"] {
    letter-spacing: 2px;
  }

  &:focus {
    border: 2px solid rgb(29, 155, 240);
  }

  ${({ $isError }) =>
    $isError &&
    `
      color: #d20d0d;
      border: 2px solid red;
  
      &:focus {
        border: 2px solid red;
      }
    `};
`;

export const InputName = styled.p`
  padding-left: 5px;
  font-size: clamp(10px, 2.5vw, 12px);
  opacity: 0.5;
  margin: 0;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: color 0.3s ease;
`;
export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 5px;
  font-size: 16px;
  text-align: start;
  position: relative;
  flex: 1 1 auto;

  ${({ $style }) => $style};

  &:focus-within p {
    color: rgb(29, 155, 240);
    opacity: 1;
  }

  ${({ $isError }) =>
    $isError &&
    `
    &:focus-within p {
      color: red;
      opacity: 0.9;
    }

    p {
      color: red;
      opacity: 0.9;
    }
  `};
`;

export const Button = styled.button`
  border: 0;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  color: #0f0f0f;
  background-color: #ffffff;
  font-weight: 500;

  &:hover {
    background-color: #fafafaa0;
  }

  &:active {
    background-color: #ffffff79;
  }

  ${({ $style }) => $style};
`;

export const ButtonClose = styled(NavLink)`
  padding: 5px 11px;
  border-radius: 50%;
  font-size: 20px;
  position: absolute;
  top: 10px;
  left: 10px;
  &::after {
    content: "X";
    border: 0;
    padding: 5px 11px;
    cursor: pointer;
    color: #fff;
    border-radius: 50%;
    border: 1px solid #c1c0c0d6;
    font-size: 20px;
    position: absolute;
    top: 0px;
    left: 0px;
  }

  &:hover {
    border-radius: 50%;
    background-color: #8282822e;
  }
`;
export const Error = styled.span`
  color: red;
  font-size: clamp(12px, 2vw, 14px);
  letter-spacing: 1px;
  padding-left: 6px;
  transition: all 0.3s ease;
`;
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
  flex: 1;
  padding: clamp(12px, 3vw, 18px) clamp(2px, 1vw, 8px) clamp(4px, 1vw, 8px)
    clamp(2px, 1vw, 8px);
  font-size: clamp(12px, 2.5vw, 16px);
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
