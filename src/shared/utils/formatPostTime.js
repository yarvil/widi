export function formatPostTime(time) {
  if (!time) {
    return " · Now";
  }
  const options = {
    day: "numeric",
    month: "short",
  };
  const utcTime = time.endsWith("Z") ? time : time + "Z";

  const timestamp = new Date(utcTime).getTime();
  const sec = Math.floor((Date.now() - timestamp) / 1000);

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

  const date = new Date(utcTime);
  return ` · ${date.toLocaleDateString("en-UA", options)}`;
}
