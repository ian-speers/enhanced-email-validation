const underTest = require('./');

test('domain validations', () => {
  expect(underTest('test@temple.edu')).toEqual({
    valid: true,
  });
  expect(underTest('test@rfs.edu.ps')).toEqual({
    valid: true,
  });
  expect(underTest('test@gmail.co')).toEqual({
    valid: false,
    suggestions: ['test@gmail.com'],
  });
  expect(underTest('test@gmal.com')).toEqual({
    valid: false,
    suggestions: ['test@gmail.com'],
  });
});

test('email validations', () => {
  expect(underTest('test@gmail.com')).toEqual({
    valid: true,
  });
  expect(underTest('test@yahoo.com')).toEqual({
    valid: true,
  });
  expect(underTest('akjaslkfjalkf')).toEqual({
    valid: false,
  });
  expect(underTest('abc@.com')).toEqual({
    valid: false,
  });
  expect(underTest('abc...def@mail.com')).toEqual({
    valid: false,
  });
  expect(underTest('.abc@mail.com')).toEqual({
    valid: false,
  });
});
