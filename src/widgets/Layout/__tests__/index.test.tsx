import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Layout from '../index';

vi.mock('../../Sidebar', () => ({
  __esModule: true,
  default: () => <div data-testid="sidebar">Sidebar</div>,
}));

const TestComponent = () => <div data-testid="test-component">Test Component</div>;

describe('Layout', () => {
  it('рендерит сайдбар', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TestComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('sidebar')).not.toBeNull();
  });

  it('рендерит основной контент через Outlet', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TestComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('test-component')).not.toBeNull();
  });

  it('имеет правильную структуру', () => {
    const { container } = render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TestComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(container.querySelector('[data-testid="layout"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="main"]')).not.toBeNull();
  });
});
