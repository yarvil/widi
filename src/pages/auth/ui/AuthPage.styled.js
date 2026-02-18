import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-inline: 16px;
  height: 100vh;
  gap: 10px;
  flex: 1 1 auto;

  @media (min-width: 860px) {
    flex-direction: row;
    gap: 50px;
  }
`;

export const LogotypeWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    height: 120px;
    width: auto;
  }
  @media (min-width: 860px) {
    svg {
      height: clamp(160px, calc(-17.931px + 20.69vw), 280px);
      width: auto;
    }
  }
`;

export const Title = styled.h2`
  color: #fff;
  font-size: clamp(4rem, -3.4138rem + 13.7931vw, 9rem);
  line-height: 80%;
  font-family: "Style Script", cursive;
  margin-block: 0;
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  position: relative;
  padding: 20px;
  border: 1px solid #2f3336;

  border-radius: 16px;
  width: clamp(280px, calc(251.429px + 8.929vw), 380px);
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

export const SubTitle = styled.h2`
  margin-block: 20px 10px;
  color: rgb(239, 243, 244);
  font-size: 16px;
`;

export const SubText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-inline: 0;

  text-transform: uppercase;
  font-weight: 300;
  font-size: 16px;

  &::before,
  &::after {
    content: "";
    flex-grow: 1;
    border-bottom: 1px solid rgb(47, 51, 54);
  }
  &::before {
    margin-right: 10px;
  }
  &::after {
    margin-left: 10px;
  }
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
  ${({ $style }) => $style};
`;

export const InputError = styled.span`
  color: red;
  font-size: clamp(12px, 2vw, 14px);
  letter-spacing: 1px;
  padding-left: 6px;
  transition: all 0.3s ease;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 9999px;
  border: ${(props) =>
    props.$primary ? "transparent" : "1px solid rgb(83, 100, 113)"};
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$primary ? "rgb(239, 243, 244)" : "transparent"};
  color: ${(props) =>
    props.$primary ? "rgb(15, 20, 25)" : "rgb(239, 243, 244)"};
  font-weight: 500;

  &:hover {
    background-color: ${(props) =>
      props.$primary ? "rgb(193, 197, 198)" : "rgba(239, 243, 244, 0.1)"};
  }

  &:active {
    background-color: #ffffff79;
  }

  ${({ $style }) => $style};
`;

export const ButtonClose = styled(Link)`
  display: flex;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    border-radius: 50%;
    background-color: #8282822e;
  }
`;

export const ButtonLink = styled(Link)`
  color: rgb(15, 20, 25);
  border-radius: 9999px;
  padding: 10px 20px;
  background-color: rgb(239, 243, 244);
  font-weight: 500;
  border: ${(props) =>
    props.$primary ? "transparent" : "1px solid rgb(83, 100, 113)"};
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$primary ? "rgb(239, 243, 244)" : "transparent"};
  color: ${(props) =>
    props.$primary ? "rgb(15, 20, 25)" : "rgb(239, 243, 244)"};
  font-weight: 500;

  &:hover {
    background-color: ${(props) =>
      props.$primary ? "rgb(215, 219, 220)" : "rgba(239, 243, 244, 0.1)"};
  }
`;

export const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 100%;
`;
