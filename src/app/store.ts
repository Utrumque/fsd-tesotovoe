import { configureStore } from '@reduxjs/toolkit';

import { cocktailApi } from '../entities/cocktail/api/cocktailApi';

export const store = configureStore({
  reducer: {
    [cocktailApi.reducerPath]: cocktailApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(cocktailApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
