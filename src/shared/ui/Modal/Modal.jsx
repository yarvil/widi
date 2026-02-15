import React from "react";
import Close from "@/shared/assets/icons/x-icon.svg?react";
import PropTypes from "prop-types";
import MainLogo from '@/shared/assets/logo/WiDi.svg?react'
import {
  ModalWrapper,
  Modal,
  ModalContent,
  CloseButton,
} from "./Modal.styled";
import { LogoWrapper, Title } from "../Header/HeaderStyled";
export default function ModalWindow(props) {
  const { isOpen, closeModal,children } = props;
  return (
    <>
      {isOpen && (
        <ModalWrapper>
          <Modal>
            <CloseButton>
              <Close onClick={closeModal} />
            </CloseButton>
            <ModalContent>
              <LogoWrapper>
                <MainLogo />
                <Title>WiDi</Title>
              </LogoWrapper>
              {children}
            </ModalContent>
          </Modal>
        </ModalWrapper>
      )}
    </>
  );
}

ModalWindow.propTypes = {
  
  isOpen: PropTypes.func,
  closeModal: PropTypes.func,
  children:PropTypes.node,
};
