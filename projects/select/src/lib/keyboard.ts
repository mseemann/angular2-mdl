// eslint-disable-next-line no-shadow
export enum KEYS {
  tab = 9,
  enter = 13,
  escape = 27,
  upArrow = 38,
  downArrow = 40,

  a = 65,
  b = 66,
  c = 67,
  d = 68,
  e = 69,
  f = 70,
  g = 71,
  h = 72,
  i = 73,
  j = 74,
  k = 75,
  l = 76,
  m = 77,
  n = 78,
  o = 79,
  p = 80,
  q = 81,
  r = 82,
  s = 83,
  t = 84,
  u = 85,
  v = 86,
  w = 87,
  x = 88,
  y = 89,
  z = 90,
}

// eslint-disable-next-line
export const keyboardEventKeyCode = ($event: KeyboardEvent): number => ($event.which || $event.charCode || $event.keyCode);

export const keyboardEventKey = ($event: KeyboardEvent): string => $event.key || String.fromCharCode(keyboardEventKeyCode($event));

export const isKey = ($event: KeyboardEvent, ...keys: KEYS[]): boolean => keys.indexOf(keyboardEventKeyCode($event)) !== -1;

export const isCharacterKey = ($event: KeyboardEvent): boolean => {
  const keyCode = keyboardEventKeyCode($event);
  return !!String.fromCharCode(keyCode) && keyCode >= 48 && keyCode <= 90;
};
