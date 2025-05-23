import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loader } from '../index';

describe('Loader', () => {
  it('должен корректно рендериться', () => {
    const { container } = render(<Loader />);
    expect(container).not.toBeNull();
  });

  it('должен содержать элемент loader', () => {
    const { container } = render(<Loader />);
    const loader = container.querySelector('[data-testid="loader"]');
    expect(loader).not.toBeNull();
  });

  it('должен содержать элемент spinner', () => {
    const { container } = render(<Loader />);
    const spinner = container.querySelector('[data-testid="spinner"]');
    expect(spinner).not.toBeNull();
  });
});
