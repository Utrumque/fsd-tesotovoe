import { describe, it, expect } from 'vitest';
import { store } from '../store';

describe('store', () => {
  it('создаётся и имеет метод getState', () => {
    expect(store).toBeDefined();
    expect(typeof store.getState).toBe('function');
  });
});
