export const toNumber = (value: number | string): number => {
  if (typeof value === "undefined") {
    return null;
  } else if (typeof value === "string") {
    return parseInt(value, 10);
  }
  return value;
};
