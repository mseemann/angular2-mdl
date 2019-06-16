export enum Key {
  Tab = 9,
  Enter = 13,
  Escape = 27,
  UpArrow = 38,
  DownArrow = 40,

  A = 65,
  B = 66,
  C = 67,
  D = 68,
  E = 69,
  F = 70,
  G = 71,
  H = 72,
  I = 73,
  J = 74,
  K = 75,
  L = 76,
  M = 77,
  N = 78,
  O = 79,
  P = 80,
  Q = 81,
  R = 82,
  S = 83,
  T = 84,
  U = 85,
  V = 86,
  W = 87,
  X = 88,
  Y = 89,
  Z = 90,
}

export function keyboardEventKeyCode($event: KeyboardEvent): number {
  // tslint:disable-next-line
  return ($event.which || $event.charCode || $event.keyCode);
}

export function keyboardEventKey($event: KeyboardEvent): string {
  return $event.key || String.fromCharCode(keyboardEventKeyCode($event));
}

export function isKey($event: KeyboardEvent, ...keys: Key[]): boolean {
  return keys.indexOf(keyboardEventKeyCode($event)) !== -1;
}

export function isCharacterKey($event: KeyboardEvent): boolean {
  const keyCode = keyboardEventKeyCode($event);
  return !!String.fromCharCode(keyCode) && keyCode >= 48 && keyCode <= 90;
}
