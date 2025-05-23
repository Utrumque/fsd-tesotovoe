import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from '../index';
import { useEffect } from 'react';

const ProblemChild = () => {
  useEffect(() => {
    throw new Error('Test error');
  }, []);
  return null;
};

describe('ErrorBoundary', () => {
  it('рендерит детей, если нет ошибки', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByTestId('child')).not.toBeNull();
  });

  it('рендерит сообщение об ошибке, если произошла ошибка', () => {
    const consoleError = console.error;
    console.error = vi.fn();

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('errorBoundary.somethingWentWrong')).not.toBeNull();
    expect(screen.getByText('errorBoundary.refreshOrTryLater')).not.toBeNull();
    expect(screen.getByText('errorBoundary.refreshPage')).not.toBeNull();

    console.error = consoleError;
  });

  it('вызывает window.location.reload при клике на кнопку', () => {
    const consoleError = console.error;
    console.error = vi.fn();
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const button = screen.getByText('errorBoundary.refreshPage');
    button.click();
    expect(reloadMock).toHaveBeenCalled();
    console.error = consoleError;
  });
});
