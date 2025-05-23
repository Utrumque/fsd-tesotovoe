import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { withProviders } from '../providers/withProviders';
import { AppRouter } from 'app/router';

describe('App', () => {
  it('рендерится без ошибок', () => {
    expect(() => render(withProviders(<AppRouter />))).not.toThrow();
  });
});
