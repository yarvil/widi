import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

export default function SubmitBtn({
  text,
  className,
  type = "button",
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={classNames("submit-btn", className)}
      {...rest}
    >
      {children || text}
    </button>
  );
}


SubmitBtn.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    children:PropTypes.node,
}