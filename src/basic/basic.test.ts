import * as basic from './basic';
import { time } from '../time';

describe('Basic: Inverse function', () => {
  it('Inverse 25: should return 0.04.', () => {
    expect(basic.Inverse(25, 4)).toBe(0.04);
  });

  it('Inverse 2: should return 0.5.', () => {
    expect(basic.Inverse(2, 1)).toBe(0.5);
  });

  it('Inverse 0: should return a error.', () => {
    try {
      basic.Inverse(0);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(`The parameter 'val' cannot be equal to zero (0).`);
    }
  });

  it('Inverse 10 and -5: should return a error.', () => {
    try {
      basic.Inverse(10, -5);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        `Inverse function error.\nError: Number of decimals in function round must be an integer from 0 to 15 inclusive`,
      );
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

  it('Percent function: should return a error.', () => {
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

describe('Basic: Convert function', () => {
  it('Convert function: 30min', () => {
    const minutes = 30;
    const sourceUnit = time.find((unit) => unit.text === 'Minute')?.value ?? 0;
    const targetUnit = time.find((unit) => unit.text === 'Hour')?.value ?? 0;
    const value = basic.Convert(minutes, sourceUnit, targetUnit);

    expect(value).toBe(2);
  });

  it('Convert function: 5h', () => {
    const minutes = 5;
    const sourceUnit = time.find((unit) => unit.text === 'Hour')?.value ?? 0;
    const targetUnit = time.find((unit) => unit.text === 'Second')?.value ?? 0;
    const value = basic.Convert(minutes, sourceUnit, targetUnit);

    expect(value).toBe(0.0001);
  });

  it('Convert function: should return a error', () => {
    try {
      const minutes = 12;
      const sourceUnit = time[12].value;
      const targetUnit = 0;
      const value = basic.Convert(minutes, sourceUnit, targetUnit);

      expect(value).toBe(0.5);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        `Calculate error.\nError: The "targetUnit" variable cannot be minor or equal to zero (0) (targetUnit <= 0).`,
      );
    }
  });

  it('Convert function: should return a error', () => {
    try {
      const minutes = 0;
      const sourceUnit = time[0].value;
      const targetUnit = time[8].value;
      const value = basic.Convert(minutes, sourceUnit, targetUnit);

      expect(value).toBe(0.5);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(`Calculate error.\nError: The "sourceValue" variable cannot be equal to zero (0).`);
    }
  });

  it('Convert function: should return a error', () => {
    try {
      const minutes = 7;
      const sourceUnit = 0;
      const targetUnit = time[8].value;
      const value = basic.Convert(minutes, sourceUnit, targetUnit);

      expect(value).toBe(0.5);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(`Calculate error.\nError: The "sourceUnit" variable cannot be equal to zero (0).`);
    }
  });
});

describe('Basic: Summation function', () => {
  it('Summation function: n', () => {
    const lowerLimit = 0;
    const upperLimit = 10;
    const expression = 'n';
    const result = basic.Summation(lowerLimit, upperLimit, expression);
    expect(result).toBe(55);
  });

  it('Summation function: (n+1)/2', () => {
    const lowerLimit = 1;
    const upperLimit = 5;
    const expression = '(n+1)/2';
    const result = basic.Summation(lowerLimit, upperLimit, expression);
    expect(result).toBe(10);
  });

  it('Summation function: (n+1)/2', () => {
    try {
      const lowerLimit = -20;
      const upperLimit = -10;
      const expression = 'x';
      const result = basic.Summation(lowerLimit, upperLimit, expression);
      expect(result).toBe(10);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(`Summation error.\nError: Undefined symbol x`);
    }
  });
});

describe('Basic: Rho function', () => {
  it('Rho function: 10, 5, 3', () => {
    const lambda = 10;
    const mu = 5;
    const serverSize = 3;
    const result = basic.Rho(lambda, mu, serverSize);
    expect(result).toBe(0.6667);
  });

  it('Rho function: 20, 2, 1', () => {
    const lambda = 20;
    const mu = 2;
    const serverSize = 1;
    const result = basic.Rho(lambda, mu, serverSize);
    expect(result).toBe(10);
  });

  it('Rho function: 0, 7, 4', () => {
    const lambda = 0;
    const mu = 7;
    const serverSize = 4;
    const result = basic.Rho(lambda, mu, serverSize);
    expect(result).toBe(0);
  });

  it('Rho function: 2, 0, 5', () => {
    try {
      const lambda = 2;
      const mu = 0;
      const serverSize = 5;
      const result = basic.Rho(lambda, mu, serverSize);
      expect(result).toBe(0);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        `System utilization factor error.\nError: The parameter 'mu' cannot be equal to zero (0).`,
      );
    }
  });

  it('Rho function: 2, 3, 0', () => {
    try {
      const lambda = 2;
      const mu = 3;
      const serverSize = 0;
      const result = basic.Rho(lambda, mu, serverSize);
      expect(result).toBe(0);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        `System utilization factor error.\nError: The parameter 'serverSize' cannot be equal to zero (0) or minor to one (serverSize < 1).`,
      );
    }
  });

  it('Rho function: 15, 4, -7', () => {
    try {
      const lambda = 15;
      const mu = 4;
      const serverSize = -7;
      const result = basic.Rho(lambda, mu, serverSize);
      expect(result).toBe(-26.25);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        `System utilization factor error.\nError: The parameter 'serverSize' cannot be equal to zero (0) or minor to one (serverSize < 1).`,
      );
    }
  });
});
