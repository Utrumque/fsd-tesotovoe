import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '../index';
import { AVAILABLE_COCKTAIL_CODES } from 'shared/constants/cocktails';

const renderWithRouter = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/*" element={<Sidebar />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Sidebar', () => {
  it('рендерит кнопку меню', () => {
    renderWithRouter();
    expect(screen.getByRole('button')).not.toBeNull();
  });

  it('открывает сайдбар при клике на кнопку меню', () => {
    renderWithRouter();
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).not.toBeNull();
  });

  it('закрывает сайдбар при клике на оверлей', () => {
    renderWithRouter();
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    const overlay = screen.getByTestId('sidebar-overlay');
    fireEvent.click(overlay);
    expect(screen.queryByTestId('sidebar-overlay')).toBeNull();
  });

  it('отображает все доступные коктейли в навигации', () => {
    renderWithRouter();
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    AVAILABLE_COCKTAIL_CODES.forEach(code => {
      const link = screen.getByText(code.charAt(0).toUpperCase() + code.slice(1));
      expect(link).not.toBeNull();
    });
  });

  it('закрывает сайдбар при клике на ссылку', () => {
    renderWithRouter();
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    const firstLink = screen.getByText(AVAILABLE_COCKTAIL_CODES[0].charAt(0).toUpperCase() + AVAILABLE_COCKTAIL_CODES[0].slice(1));
    fireEvent.click(firstLink);

    expect(screen.queryByTestId('sidebar-overlay')).toBeNull();
  });

  it('подсвечивает активную ссылку', () => {
    renderWithRouter('/margarita');
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    const activeLi = screen.getByTestId('sidebar-active');
    expect(activeLi).not.toBeNull();
  });
});
