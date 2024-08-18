import * as basic from './basic';

describe('Basic: Inverse function', () => {
  it('Inverse 25: should return 0.04.', () => {
    expect(basic.Inverse(25, 4)).toBe(0.04);
  });

  it('Inverse 2: should return 0.5.', () => {
    expect(basic.Inverse(2, 1)).toBe(0.5);
  });

  it('Inverse 0: should a error.', () => {
    try {
      basic.Inverse(0);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(`The parameter 'val' cannot be equal to zero (0).`);
    }
  });
});

describe('Basic: Percent function', () => {
  it('Percent function: 25, 100, DIVISION.', () => {
    expect(basic.Percent(25, 100, 'DIVISION')).toBe('25%');
  });

  it('Percent function: 0.75.', () => {
    expect(basic.Percent(0.75)).toBe('75%');
  });

  it('Percent function: should a error.', () => {
    try {
      expect(basic.Percent(25, 0)).toBe(0.25);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        `Error in convert value = '25' to percent.\nError: The parameter 'total' cannot be equal to zero (0).`,
      );
    }
  });
});
