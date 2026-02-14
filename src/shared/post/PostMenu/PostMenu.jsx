import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { MoreButton, DropdownMenu, MenuItem } from "./PostMenu.styled";
import MoreIcon from "@/shared/assets/icons/dots.svg?react";
import { IconWrapper } from "shared/post/Actions/Actions.styled";

export default function PostMenu({ onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

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

  const handleEdit = () => {
    setShowMenu(false);
    onEdit();
  };

  const handleDelete = () => {
    setShowMenu(false);
    onDelete();
  };

  return (
    <div ref={menuRef} style={{ marginLeft: "auto", position: "relative" }}>
      <MoreButton onClick={() => setShowMenu(!showMenu)}>
        <IconWrapper>
          <MoreIcon />
        </IconWrapper>
      </MoreButton>
      {showMenu && (
        <DropdownMenu>
          <MenuItem onClick={handleEdit}>Edit post</MenuItem>
          <MenuItem $danger onClick={handleDelete}>
            Delete post
          </MenuItem>
        </DropdownMenu>
      )}
    </div>
  );
}

PostMenu.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
