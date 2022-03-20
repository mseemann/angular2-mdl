export const toNumber = (
  value: number | string | undefined | null
): number | null | undefined => {
  if (typeof value === "undefined") {
    return null;
  } else if (typeof value === "string") {
    return parseInt(value, 10);
  }
  return value;
};
