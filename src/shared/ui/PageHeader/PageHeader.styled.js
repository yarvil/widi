import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  padding-inline: ${(props) => (props.$tabs ? "0px" : "10px")};
  align-items: center;
  gap: 20px;
  position: sticky;
  top: 82px;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(12px);
  border-bottom: ${(props) => (props.$tabs ? "1px solid #2f3336" : "none")};
  z-index: 50;
`;

export const Title = styled.h3`
  margin: 0;
  margin-left: 8px;
  font-size: 20px;
  font-weight: 700;
  padding: 12px 0;
`;

export const TabsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 53px;
`;

export const Tab = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 15px;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  color: ${(props) => (props.$active ? "#e7e9ea" : "#71767b")};
  position: relative;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$menuOpen ? "transparent" : "rgba(231, 233, 234, 0.1)"};
  }
`;

export const TabContent = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const TabIndicator = styled.div`
  position: absolute;
  bottom: -100%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 4px;
  background-color: rgb(29, 155, 240);
  border-radius: 2px 2px 0 0;
`;
