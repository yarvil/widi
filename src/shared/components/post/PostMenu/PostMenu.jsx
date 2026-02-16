import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import MoreIcon from "@/shared/assets/icons/dots.svg?react";
import TrashIcon from "@/shared/assets/icons/trash-2.svg?react";
import EditIcon from "@/shared/assets/icons/square-pen.svg?react";
import FollowIcon from "@/shared/assets/icons/user-round-plus.svg?react";
import UnfollowIcon from "@/shared/assets/icons/user-round-minus.svg?react";
import {
  MoreButton,
  DropdownMenu,
  MenuItem,
  MenuWrapper,
} from "./PostMenu.styled";

const MENU_VARIANTS = {
  owner: (handlers) => [
    { id: "edit", label: "Edit", icon: EditIcon, onClick: handlers.onEdit },
    {
      id: "delete",
      label: "Delete",
      icon: TrashIcon,
      onClick: handlers.onDelete,
      danger: true,
    },
  ],
  other: (handlers, isFollowing) => [
    {
      id: "follow",
      label: isFollowing ? "Unfollow" : "Follow",
      icon: isFollowing ? UnfollowIcon : FollowIcon,
      onClick: handlers.onFollow,
    },
  ],
};

export default function PostMenu({
  variant = "owner",
  isFollowing = false,
  ...handlers
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const menuItems = MENU_VARIANTS[variant](handlers, isFollowing);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleItemClick = (item) => {
    setShowMenu(false);
    item.onClick?.();
  };

  return (
    <MenuWrapper ref={menuRef}>
      <MoreButton onClick={() => setShowMenu(!showMenu)}>
        <MoreIcon />
      </MoreButton>
      {showMenu && (
        <DropdownMenu>
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              $danger={item.danger}
              onClick={() => handleItemClick(item)}
            >
              <item.icon />
              {item.label}
            </MenuItem>
          ))}
        </DropdownMenu>
      )}
    </MenuWrapper>
  );
}

PostMenu.propTypes = {
  variant: PropTypes.string,
  isFollowing: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onFollow: PropTypes.func,
};
