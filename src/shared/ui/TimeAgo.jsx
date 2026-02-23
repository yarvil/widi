import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { formatPostTime } from "@/shared/utils/formatPostTime";

const SpanText = styled.span`
  color: #6e767d;
  font-size: 15px;
  white-space: nowrap;
  flex-shrink: 0;
`;

function TimeAgo({ time }) {
  const [text, setText] = useState(formatPostTime(time));

  useEffect(() => {
    const interval = setInterval(() => {
      setText(formatPostTime(time));
    }, 60000);
    return () => clearInterval(interval);
  }, [time]);

  return <SpanText>{text}</SpanText>;
}

TimeAgo.propTypes = {
  time: PropTypes.string,
};

export default TimeAgo;
