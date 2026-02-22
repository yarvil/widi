import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import ChevronIcon from "@/shared/assets/icons/chevron-down.svg?react";
import CheckIcon from "@/shared/assets/icons/check.svg?react";
import {
  DropdownMenu,
  DropDownMenuHeader,
  MenuItem,
  MenuWrapper,
  ChevronWrapper,
} from "./SortMenu.styled";

export default function SortMenu({
  activeSort,
  onSortChange,
  isOpen,
  onToggle,
}) {
  const menuRef = useRef(null);

  const sortOptions = [
    { id: "newest", label: "Нові" },
    { id: "oldest", label: "Старі" },
    { id: "comments", label: "Коментарі" },
    { id: "likes-desc", label: "Популярні" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onToggle(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const handleSelect = (sortId) => {
    onSortChange(sortId);
    onToggle(false);
  };

  return (
    <MenuWrapper ref={menuRef}>
      <ChevronWrapper>
        <ChevronIcon />
      </ChevronWrapper>
      {isOpen && (
        <DropdownMenu>
          <DropDownMenuHeader onClick={(e) => e.stopPropagation()}>
            <span>Сортування</span>
          </DropDownMenuHeader>
          {sortOptions.map((option) => (
            <MenuItem key={option.id} onClick={() => handleSelect(option.id)}>
              {option.label}
              {activeSort === option.id && <CheckIcon />}
            </MenuItem>
          ))}
        </DropdownMenu>
      )}
    </MenuWrapper>
  );
}

SortMenu.propTypes = {
  activeSort: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
