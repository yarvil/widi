import styled from "styled-components";
import PropTypes from "prop-types";

const SpanText = styled.span`
  color: #6e767d;
  font-size: 15px;
`;

function PostDate({ time }) {
  if (time === null) {
    return console.log(`createdAt:`, time);
  }

  const utcTime = time.endsWith("Z") ? time : time + "Z";

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const date = new Date(utcTime);

  const fullDate = date.toLocaleDateString("uk-UA", options);
  const timeDate = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateWithTime = `${timeDate} · ${fullDate}`;
  dateWithTime;

  return <SpanText>{dateWithTime}</SpanText>;
}

PostDate.propTypes = {
  time: PropTypes.string,
};

export default PostDate;
