const phoneNumbers = require('../main');

test('Algorithm', () => {
  const obj = {
    unmaskedValue: '123'
  };
  expect(phoneNumbers(obj)).toBe([1,2,3]);
});