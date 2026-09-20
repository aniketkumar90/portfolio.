export const cleanUrl = (url) => {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
