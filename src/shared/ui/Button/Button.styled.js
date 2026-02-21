import styled from "styled-components";

export const StyledButton = styled.button`
  color: rgb(239, 243, 244);
  border-radius: 9999px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: 0.2s;

  ${(props) => {
    switch (props.$size) {
      case "large":
        return `
          padding: 16px 24px;
          font-size: 16px;
        `;
      default:
        return `
          padding: 9px 16px;
          font-size: 15px;
        `;
    }
  }}

  ${(props) => {
    switch (props.$variant) {
      case "primary":
        return `
          color: rgb(15, 20, 25);
          background-color: rgb(239, 243, 244);
          
          &:hover:not(:disabled) {
            background-color: rgb(215, 219, 220);
          }
        `;

      case "secondary":
        return `
          background-color: transparent;
          border: 1px solid rgb(83, 100, 113);
          
          &:hover:not(:disabled) {
            background-color: rgba(239, 243, 244, 0.1);
          }
        `;

      case "danger":
        return `
          background-color: rgb(244, 33, 46);
          
          &:hover:not(:disabled) {
            background-color: rgb(220, 30, 41);
          }
        `;

      case "secondaryDanger":
        return `
          border: 1px solid rgb(83, 100, 113);
          background-color: transparent;
          min-width: 100px;
        
          .hover-text {
          display: none;
          }
        
          &:hover {
            background-color: rgb(215, 219, 220);
              
            color: rgb(244, 33, 46);
            border: 1px solid rgb(103, 7, 15);
            background-color: rgba(244, 33, 46, 0.1);
              
            .default-text {
              display: none;
            }
        
            .hover-text {
              display: inline;
            }
      
          }
`;

      case "blue":
        return `
          background-color: rgb(29, 155, 240);
          
          &:hover:not(:disabled) {
            background-color: rgb(26, 140, 216);
          }
        `;

      default:
        return "";
    }
  }}

    &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
