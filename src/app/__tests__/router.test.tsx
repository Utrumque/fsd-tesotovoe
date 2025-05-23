import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from '../router/AppRouter';

describe('AppRouter', () => {
  it('редиректит с / на первую страницу коктейля', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId('cocktail-page')).not.toBeNull();
  });

  it('рендерит CocktailPage по валидному коду', () => {
    render(
      <MemoryRouter initialEntries={['/margarita']}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId('cocktail-page')).not.toBeNull();
  });

  it('рендерит NotFoundPage по несуществующему пути', async () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(await screen.findByTestId('not-found-page')).not.toBeNull();
  });
});
