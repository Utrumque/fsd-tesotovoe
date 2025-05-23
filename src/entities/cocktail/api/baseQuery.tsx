import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';

import { API_URL } from 'app/config';

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: API_URL,
    //credentials: 'include',
  }),
  {
    maxRetries: 0,
  }
);

export const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    (result.error && 'originalStatus' in result.error && result.error.originalStatus === 504) ||
    (result.error && 'status' in result.error && result.error.status === 504)
  ) {
    toast.error('Gateway Timeout');
  }

  return result;
};
