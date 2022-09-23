const underTest = require('./');

test('Domain', () => {
  expect(underTest('test@gmail.co')).toEqual({
    valid: false,
    suggestions: ['test@gmail.com'],
  });
});