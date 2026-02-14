import { ActionButton, IconWrapper } from "shared/post/Actions/Actions.styled";
import ArrowBack from "shared/assets/icons/arrow-left.svg?react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Wrapper,
  Title,
  TabsWrapper,
  Tab,
  TabIndicator,
} from "./PageHeader.styled";

export default function PageHeader({
  variant = "back",
  title = "Post",
  tabs,
  activeTab,
  onTabChange,
}) {
  const navigate = useNavigate();

  if (variant === "back") {
    return (
      <Wrapper>
        <ActionButton onClick={() => navigate(-1)}>
          <IconWrapper>
            <ArrowBack />
          </IconWrapper>
        </ActionButton>
        <Title>{title}</Title>
      </Wrapper>
    );
  }

  if (variant === "tabs") {
    return (
      <Wrapper $tabs>
        <TabsWrapper>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              $active={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
              {activeTab === tab.id && <TabIndicator />}
            </Tab>
          ))}
        </TabsWrapper>
      </Wrapper>
    );
  }

  return null;
}

PageHeader.propTypes = {
  variant: PropTypes.oneOf(["back", "tabs"]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  activeTab: PropTypes.string,
  onTabChange: PropTypes.func,
};
