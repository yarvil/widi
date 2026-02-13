import React from "react";
import Close from "@/shared/assets/icons/x-icon.svg?react";
import PropTypes from "prop-types";
import {
  ModalWrapper,
  Modal,
  ModalContent,
  CloseButton,
  ButtonWrapper,
  SubmitBtn,
} from "./Modal.styled";
export default function ModalWindow(props) {
  const { isOpen, closeModal, logOut } = props;
  return (
    <>
      {isOpen && (
        <ModalWrapper>
          <Modal>
            <CloseButton>
              <Close onClick={closeModal} />
            </CloseButton>
            <ModalContent>
              <p style={{ color: "#fff", textAlign: `center` }}>
                Do you really want to exit WiDi?
              </p>
            </ModalContent>
            <ButtonWrapper>
              <SubmitBtn type="submit" onClick={logOut}>
                Yes
              </SubmitBtn>
              <SubmitBtn type="submit" onClick={closeModal}>
                No
              </SubmitBtn>
            </ButtonWrapper>
          </Modal>
        </ModalWrapper>
      )}
    </>
  );
}

ModalWindow.propTypes = {
  isOpen: PropTypes.func,
  closeModal: PropTypes.func,
  logOut: PropTypes.func,
};
