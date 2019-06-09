import { toNumber } from './number.property';

describe('NumberPropertyTest', () => {

  it('should work for null values', () => {
    expect(toNumber(null)).toBe(null);

    expect(toNumber(undefined)).toBe(null);
  });

  it('should work for string values', () => {
    expect(toNumber('1')).toBe(1);

    expect(toNumber('0')).toBe(0);
  });

  it('should work for number values', () => {
    expect(toNumber(1)).toBe(1);

    expect(toNumber(0)).toBe(0);
  });
});
