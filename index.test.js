const { default: underTest } = require('./');

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
  expect(underTest('test@gmail.con')).toEqual({
    valid: false,
    suggestions: ['test@gmail.com'],
  });
  expect(underTest('test@gmail.coma')).toEqual({
    valid: false,
    suggestions: ['test@gmail.com'],
  });
  expect(underTest('test@gmail.comm')).toEqual({
    valid: false,
    suggestions: ['test@gmail.com'],
  });
  expect(underTest('test@gmail.comj')).toEqual({
    valid: false,
    suggestions: ['test@gmail.com'],
  });
  expect(underTest('test@gmail.clm')).toEqual({
    valid: false,
    suggestions: ['test@gmail.com'],
  });
  expect(underTest('test@gmaik.com')).toEqual({
    valid: false,
    suggestions: ['test@gmail.com'],
  });
  expect(underTest('test@yahoo.con')).toEqual({
    valid: false,
    suggestions: ['test@yahoo.com'],
  });
  expect(underTest('test@yahoo.ck')).toEqual({
    valid: false,
    suggestions: ['test@yahoo.co'],
  });
  expect(underTest('test@netzero.xom')).toEqual({
    valid: false,
    suggestions: ['test@netzero.com'],
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
