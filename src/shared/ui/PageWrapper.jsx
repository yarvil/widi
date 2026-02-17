import styled from "styled-components";

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin-inline: auto;
  border-left: 1px solid #2f3336;
  border-right: 1px solid #2f3336;
  min-height: calc(100vh - 88px);
`;

export default PageWrapper;
