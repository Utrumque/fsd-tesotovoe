import { createApi } from '@reduxjs/toolkit/query/react';

import type { Cocktail } from '../model/cocktail';
import { customBaseQuery } from './baseQuery';
import type { CocktailApiResponse } from '../model/api';

export const cocktailApi = createApi({
  reducerPath: 'cocktailApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Cocktail'],
  endpoints: builder => ({
    getCocktailsByCode: builder.query<Cocktail[], string>({
      query: code => ({
        url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${code}`,
        method: 'get',
      }),
      transformResponse: (response: CocktailApiResponse) => response.drinks || [],
      providesTags: ['Cocktail'],
    }),
  }),
});

export const { useGetCocktailsByCodeQuery } = cocktailApi;
