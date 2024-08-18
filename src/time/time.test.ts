import { time } from '.';

describe('Time variable test', () => {
  it('Time variable: Length', () => {
    const length = time.length;
    expect(length).toBe(16);
  });

  it('Time variable: Type', () => {
    const unit = time[5];
    expect(typeof unit).toBe('object');
  });

  it('Time variable: Id value type', () => {
    const unit = time[0];
    expect(typeof unit.id).toBe('number');
  });

  it('Time variable: Text value type', () => {
    const unit = time[0];
    expect(typeof unit.text).toBe('string');
  });

  it('Time variable: Value type', () => {
    const unit = time[10];
    expect(typeof unit.value).toBe('number');
  });
});
