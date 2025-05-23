import { describe, it, expect } from 'vitest';

describe('i18n', () => {
  it('инициализируется без ошибок', () => {
    expect(() => import('../i18n')).not.toThrow();
  });
});
