import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 20px;

  ${(props) =>
    props.$full &&
    `
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    `}
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid rgba(29, 156, 240, 0.3);
  border-top-color: rgb(29, 155, 240);
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loader = ({ full = true }) => {
  return (
    <LoaderContainer $full={full}>
      <Spinner />
    </LoaderContainer>
  );
};

export default Loader;

Loader.propTypes = {
  full: PropTypes.bool,
};
