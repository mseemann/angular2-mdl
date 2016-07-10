import { NumberProperty } from './number.property';

describe('NumberPropertyTest', () => {

  it('should work for null values', () => {
    let x = new NumberPropertyTest();

    x.field = null;
    expect(x.field).toBe(null);

    x.field = undefined;
    expect(x.field).toBe(null);
  });

  it('should work with default values', () => {
    let x = new NumberPropertyTest();
    expect(x.defaultField).toBe(10);
  });

  it('should work for string values', () => {
    let x = new NumberPropertyTest();

    (<any>x).field = '1';
    expect(x.field).toBe(1);

    (<any>x).field = '0';
    expect(x.field).toBe(0);
  });

  it('should work for number values', () => {
    let x = new NumberPropertyTest();

    (<any>x).field = 1;
    expect(x.field).toBe(1);

    (<any>x).field = 0;
    expect(x.field).toBe(0);
  });
});


class NumberPropertyTest {
  @NumberProperty() public field: number;
  @NumberProperty() public defaultField: number = 10;
}
