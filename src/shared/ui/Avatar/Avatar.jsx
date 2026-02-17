import PropTypes from "prop-types";

import { AvatarImage, AvatarPlaceholder, AvatarWrapper } from "./Avatar.styled";

export default function Avatar({
  src,
  alt = "User avatar",
  initials = "?",
  size = 50,
  linkTo = null,
}) {
  const avatar = src ? (
    <AvatarImage src={src} alt={alt} $size={size} />
  ) : (
    <AvatarPlaceholder $size={size}>{initials}</AvatarPlaceholder>
  );

  if (linkTo) {
    return <AvatarWrapper to={linkTo}>{avatar}</AvatarWrapper>;
  }

  return avatar;
}

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  initials: PropTypes.string,
  size: PropTypes.number,
  linkTo: PropTypes.string,
};
