import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import SortMenu from "@/shared/components/post/SortMenu/SortMenu";
import ArrowBack from "shared/assets/icons/arrow-left.svg?react";
import {
  ActionButton,
  IconWrapper,
} from "@/shared/components/post/Actions/Actions.styled";
import {
  Wrapper,
  Title,
  TabsWrapper,
  Tab,
  TabIndicator,
  TabContent,
} from "./PageHeader.styled";

export default function PageHeader({
  variant = "back",
  title = "Пост",
  tabs,
  activeTab,
  onTabChange,
  sortBy,
  onSortChange,
  showSortMenu,
  onToggleSortMenu,
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
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isForYou = tab.id === "foryou";
            const showSort = isActive && isForYou && sortBy;

            const handleTabClick = () => {
              if (isActive && isForYou) {
                onToggleSortMenu?.(!showSortMenu);
              } else {
                onTabChange(tab.id);
              }
            };

            return (
              <Tab
                key={tab.id}
                $active={isActive}
                onClick={handleTabClick}
                $menuOpen={showSort && showSortMenu}
              >
                <TabContent>
                  {tab.label}
                  {showSort && (
                    <SortMenu
                      activeSort={sortBy}
                      onSortChange={onSortChange}
                      isOpen={showSortMenu}
                      onToggle={onToggleSortMenu}
                    />
                  )}
                  {isActive && <TabIndicator />}
                </TabContent>
              </Tab>
            );
          })}
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
  sortBy: PropTypes.string,
  onSortChange: PropTypes.func,
  showSortMenu: PropTypes.bool,
  onToggleSortMenu: PropTypes.func,
};
