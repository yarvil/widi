export function formatPostTime(time) {
  const options = {
    day: "numeric",
    month: "short",
  };

  const sec = Math.floor((Date.now() - time) / 1000);
  if (sec < 60) {
    return " · <1m";
  }

  const min = Math.floor(sec / 60);
  if (min < 60) {
    return ` · ${min}m`;
  }
  const hours = Math.floor(min / 60);
  if (hours < 24) {
    return ` · ${hours}h`;
  }

  const date = new Date(time);

  const fullDate = ` · ${date.toLocaleDateString("en-UA", options)}`;
  return fullDate;
}
