import styled from "styled-components";

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  ${(props) =>
    props.$withBorder &&
    `
    border-bottom: 1px solid #2f3336;
    border-top: 1px solid #2f3336;
  `}
`;
export const IconWrapper = styled.div`
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: 0.2s ease;
`;

export const ActionButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  padding: 0;
  color: ${(props) => {
    switch (props.$action) {
      case "repost":
        return props.$active ? "rgb(0, 186, 124)" : "#6e767d";

      case "like":
        return props.$active ? "rgb(249, 24, 128)" : "#6e767d";

      default:
        return "#6e767d";
    }
  }};

  &:hover {
    color: ${(props) => {
      switch (props.$action) {
        case "like":
          return "rgb(249, 24, 128)";

        case "reply":
          return "rgb(29, 155, 240)";

        case "save":
          return "rgb(29, 155, 240)";

        default:
          return "#6e767d";
      }
    }};
  }
  &:hover ${IconWrapper} {
    background-color: ${(props) => {
      switch (props.$action) {
        case "like":
          return "rgba(249, 24, 128, 0.1)";

        case "reply":
          return "rgba(29, 155, 240, 0.1)";

        case "save":
          return "rgba(29, 155, 240, 0.1)";

        case "media":
          return "rgba(29, 155, 240, 0.1)";

        default:
          return "rgba(39, 44, 48, 0.75)";
      }
    }};
  }
  svg {
    fill: ${(props) => {
      switch (props.$action) {
        case "like":
          return props.$active ? "rgb(249, 24, 128)" : "none";

        case "save":
          return props.$active ? "rgb(29, 155, 240)" : "none";

        case "reply":
          return props.$active ? "rgb(29, 155, 240)" : "none";
      }
    }};
  }
`;

export const Count = styled.span`
  width: 24px;
  text-align: left;
  font-size: 13px;
  transition: 0.2s ease;
  overflow: hidden;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transition: 0.2s ease-in;
`;
