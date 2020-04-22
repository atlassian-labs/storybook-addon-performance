import getChange from '../src/util/get-change';

it('should return 0 when the values are the same', () => {
  expect(getChange({ baseline: 10, target: 10 })).toBe(0);
});

it('should return the correct change when the target is smaller', () => {
  expect(getChange({ baseline: 10, target: 8 })).toBe(-20);
});

it('should return the correct change when the target is larger', () => {
  expect(getChange({ baseline: 10, target: 12 })).toBe(20);
});

it('should return the correct change when the target is much larger', () => {
  expect(getChange({ baseline: 10, target: 20 })).toBe(100);
});
