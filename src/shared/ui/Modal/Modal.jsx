import React from "react";
import PropTypes from "prop-types";

import Close from "@/shared/assets/icons/x-icon.svg?react";
import LogoIcon from "@/shared/assets/logo/logotype.svg?react";
import {
  ModalWrapper,
  Modal,
  ModalContent,
  CloseButton,
  Title,
  LogoType,
  LogoWrapper,
  PrimaryButton,
  SecondaryButton,
  ModalTitle,
  ModalDesc,
  ActionsWrapper,
} from "./Modal.styled";

export default function ModalWindow(props) {
  const {
    logo,
    closeModal,
    children,
    title,
    desc,
    primaryText,
    primaryClick,
    secondaryText,
    secondaryClick,
    dangerBtn,
  } = props;
  return (
    <>
      <ModalWrapper onClick={closeModal}>
        <Modal onClick={(e) => e.stopPropagation()}>
          <CloseButton>
            <Close onClick={closeModal} />
          </CloseButton>
          <ModalContent>
            {logo && (
              <LogoWrapper>
                <LogoType>
                  <LogoIcon />
                </LogoType>
                <Title>Tereveni</Title>
              </LogoWrapper>
            )}

            <ModalTitle>{title}</ModalTitle>
            <ModalDesc>{desc}</ModalDesc>
            {children}
            <ActionsWrapper>
              <PrimaryButton $danger={dangerBtn} onClick={primaryClick}>
                {primaryText}
              </PrimaryButton>
              <SecondaryButton onClick={secondaryClick}>
                {secondaryText}
              </SecondaryButton>
            </ActionsWrapper>
          </ModalContent>
        </Modal>
      </ModalWrapper>
    </>
  );
}

ModalWindow.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.node,
  logo: PropTypes.bool,
  title: PropTypes.string,
  desc: PropTypes.string,
  primaryText: PropTypes.string,
  primaryClick: PropTypes.string,
  secondaryText: PropTypes.string,
  secondaryClick: PropTypes.string,
  dangerBtn: PropTypes.bool,
};
