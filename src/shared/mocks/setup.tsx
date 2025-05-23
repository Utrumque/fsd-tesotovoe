import { beforeEach, vi } from 'vitest';

Object.defineProperty(window, 'location', {
  value: {
    reload: vi.fn(),
  },
  writable: true,
});

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

vi.mock('i18next', () => {
  const i18n = {
    use: () => i18n,
    init: () => i18n,
    t: (key: string) => key,
  };
  return {
    default: i18n,
    t: (key: string) => key,
  };
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.mock('pages/NotFoundPage', () => ({
  __esModule: true,
  default: () => <div data-testid="not-found-page">NotFoundPage</div>,
}));
vi.mock('pages/CocktailPage', () => ({
  __esModule: true,
  default: () => <div data-testid="cocktail-page">CocktailPage</div>,
}));
vi.mock('../../pages', () => ({
  CocktailPage: () => <div data-testid="cocktail-page">CocktailPage</div>,
  NotFoundPage: () => <div data-testid="not-found-page">NotFoundPage</div>,
}));

beforeEach(() => {
  Object.defineProperty(window, 'location', {
    value: { origin: 'http://localhost', href: 'http://localhost', reload: vi.fn() },
    writable: true,
  });
});

beforeEach(() => {
  vi.spyOn(document, 'getElementById').mockReturnValue(document.createElement('div'));
  vi.mock('react-dom/client', () => ({
    createRoot: () => ({
      render: () => {},
    }),
  }));
});
