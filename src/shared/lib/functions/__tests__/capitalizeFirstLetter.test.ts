import { describe, it, expect } from 'vitest';
import { capitalizeFirstLetter } from '../capitalizeFirstLetter';

describe('capitalizeFirstLetter', () => {
  it('должен преобразовывать первую букву в верхний регистр', () => {
    expect(capitalizeFirstLetter('test')).toBe('Test');
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });

  it('должен возвращать пустую строку для пустого ввода', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });
});
