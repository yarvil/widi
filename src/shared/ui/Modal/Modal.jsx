import React from "react";
import Close from "@/shared/assets/icons/x-icon.svg?react";
import PropTypes from "prop-types";
import MainLogo from '@/shared/assets/logo/WiDi.svg?react'
import SubmitBtn from "../Button/Button";
import './Modal.scss'
import {
  ModalWrapper,
  Modal,
  ModalContent,
  CloseButton,
} from "./Modal.styled";
import { LogoWrapper, Title } from "../Header/HeaderStyled";
export default function ModalWindow(props) {
  const { isOpen, closeModal, onClick, confirmText, submitText } = props;
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
              <p style={{ color: "#fff" }}>
                {confirmText}
              </p>
                <SubmitBtn className='logoutbut' onClick={onClick} text={submitText} />
                <SubmitBtn className='cancelbut' onClick={closeModal} text='Cancel' />
            </ModalContent>
          </Modal>
        </ModalWrapper>
      )}
    </>
  );
}

ModalWindow.propTypes = {
  submitText: PropTypes.string,
  confirmText: PropTypes.string,
  isOpen: PropTypes.func,
  closeModal: PropTypes.func,
  onClick: PropTypes.func,
};
