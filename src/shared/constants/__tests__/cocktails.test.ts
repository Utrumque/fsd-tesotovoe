import { describe, it, expect } from 'vitest';
import { AVAILABLE_COCKTAIL_CODES } from '../cocktails';

describe('cocktails', () => {
  it('AVAILABLE_COCKTAIL_CODES содержит ожидаемые значения', () => {
    expect(AVAILABLE_COCKTAIL_CODES).toContain('margarita');
    expect(AVAILABLE_COCKTAIL_CODES).toContain('mojito');
    expect(AVAILABLE_COCKTAIL_CODES).toContain('a1');
    expect(AVAILABLE_COCKTAIL_CODES).toContain('kir');
  });
});
