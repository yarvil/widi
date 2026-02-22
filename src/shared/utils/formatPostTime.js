export function formatPostTime(time) {
  if (!time) {
    return " · Зараз";
  }
  const options = {
    day: "numeric",
    month: "short",
  };
  const utcTime = time.endsWith("Z") ? time : time + "Z";

  const timestamp = new Date(utcTime).getTime();
  const sec = Math.floor((Date.now() - timestamp) / 1000);

  if (sec < 60) {
    return " · <1 хв";
  }

  const min = Math.floor(sec / 60);
  if (min < 60) {
    return ` · ${min} хв`;
  }

  const hours = Math.floor(min / 60);
  if (hours < 24) {
    return ` · ${hours} год`;
  }

  const date = new Date(utcTime);
  return ` · ${date.toLocaleDateString("uk-UA", options)}`;
}
