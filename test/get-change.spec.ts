import getChange from '../src/util/get-change';

it('should return 0 when the values are the same', () => {
  expect(getChange({ baseline: 10, value: 10 })).toBe(0);
});

it('should return the correct change when the value is smaller', () => {
  expect(getChange({ baseline: 10, value: 8 })).toBe(-20);
});

it('should return the correct change when the value is larger', () => {
  expect(getChange({ baseline: 10, value: 12 })).toBe(20);
});

it('should return the correct change when the value is much larger', () => {
  expect(getChange({ baseline: 10, value: 20 })).toBe(100);
});
