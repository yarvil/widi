import PropTypes from "prop-types";
import { StyledButton } from "./Button.styled";

export default function Button({
  variant = "primary",
  size = "medium",
  children,
  ...props
}) {
  return (
    <StyledButton $variant={variant} $size={size} {...props}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "secondaryDanger",
    "danger",
    "blue",
  ]),
  size: PropTypes.oneOf(["medium", "large"]),
  children: PropTypes.node.isRequired,
};
