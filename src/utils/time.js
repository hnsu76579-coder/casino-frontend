export const to12Hour = (time24) => {
  const [h, m] = time24.split(":");
  const date = new Date();
  date.setHours(h, m);

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
