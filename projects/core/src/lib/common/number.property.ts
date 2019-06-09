export function toNumber(value: number|string): number {
  if (typeof value === 'undefined' ) {
    return null;
  } else if ( typeof value === 'string') {
    return parseInt(<string>value);
  }
  return value;
}
