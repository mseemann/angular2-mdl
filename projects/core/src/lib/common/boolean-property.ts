export const toBoolean = (value: unknown): boolean => value != null && `${value}` !== 'false';
