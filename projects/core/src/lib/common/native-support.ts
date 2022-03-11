export const callNative = (
  el: Element,
  method: string,
  arg: any | null = null // eslint-disable-line  @typescript-eslint/no-explicit-any
): void => {
  /* istanbul ignore next */ // if this code runs in browser this is allways true!
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (el[method]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    el[method](arg);
  }
};
