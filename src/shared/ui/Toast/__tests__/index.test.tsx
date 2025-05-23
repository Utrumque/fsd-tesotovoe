import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ToastContainer from '../index';

describe('ToastContainer', () => {
  it('рендерится без ошибок', () => {
    expect(() => render(<ToastContainer />)).not.toThrow();
  });
});
