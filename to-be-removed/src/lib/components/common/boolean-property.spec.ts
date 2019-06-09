import { toBoolean } from './boolean-property';

describe('toBoolean', () => {
  it('should work for null values', () => {

    expect(toBoolean(null)).toBe(false);

    expect(toBoolean(undefined)).toBe(false);
  });

  it('should work for string values', () => {

    expect(toBoolean('hello')).toBe(true);

    expect(toBoolean('true')).toBe(true);

    expect(toBoolean('')).toBe(true);

    expect(toBoolean('false')).toBe(false);
  });
});
