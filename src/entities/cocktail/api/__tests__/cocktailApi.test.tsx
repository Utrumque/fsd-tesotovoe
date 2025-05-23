import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, test, vi, afterEach } from 'vitest';

import { cocktailApi } from '../cocktailApi';
import { customBaseQuery } from '../baseQuery';

const mockCocktailResponse = {
  drinks: [
    {
      idDrink: '1',
      strDrink: 'Test Cocktail',
      strCategory: 'Test Category',
      strAlcoholic: 'Alcoholic',
      strGlass: 'Test Glass',
      strInstructions: 'Test Instructions',
      strDrinkThumb: 'test-image.jpg',
      strIngredient1: 'Ingredient 1',
      strMeasure1: 'Measure 1',
    },
  ],
};

vi.mock('../baseQuery', () => ({
  customBaseQuery: vi.fn().mockImplementation(() => ({ data: mockCocktailResponse })),
}));

describe('cocktailApi', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('getCocktailsByCode возвращает данные коктейлей', async () => {
    const store = configureStore({
      reducer: {
        [cocktailApi.reducerPath]: cocktailApi.reducer,
      },
      middleware: getDefaultMiddleware => getDefaultMiddleware().concat(cocktailApi.middleware),
    });

    const result = await store.dispatch(cocktailApi.endpoints.getCocktailsByCode.initiate('test'));

    expect(result.data).toEqual(mockCocktailResponse.drinks);
    expect(customBaseQuery).toHaveBeenCalled();
  });

  test('getCocktailsByCode обрабатывает пустой ответ', async () => {
    (customBaseQuery as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce(() => ({ data: { drinks: null } }));

    const store = configureStore({
      reducer: {
        [cocktailApi.reducerPath]: cocktailApi.reducer,
      },
      middleware: getDefaultMiddleware => getDefaultMiddleware().concat(cocktailApi.middleware),
    });

    const result = await store.dispatch(cocktailApi.endpoints.getCocktailsByCode.initiate('empty'));

    expect(result.data).toEqual([]);
    expect(customBaseQuery).toHaveBeenCalled();
  });
});
