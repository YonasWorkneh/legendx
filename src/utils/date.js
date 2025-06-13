export function formatDate(showTime = false, timestamp = Date.now()) {
  const optional = showTime
    ? {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        second: "numeric",
      }
    : {};
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-us", {
    ...options,
    ...optional,
  });

  return formatter.format(timestamp);
}

export const getTimeStamp = (isostring) => new Date(isostring).getTime();
