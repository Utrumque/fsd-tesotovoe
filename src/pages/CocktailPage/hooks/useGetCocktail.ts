import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { t } from 'i18next';

import { useGetCocktailsByCodeQuery } from 'entities/cocktail/api/cocktailApi';
import { AVAILABLE_COCKTAIL_CODES, type CocktailCode } from 'shared/constants/cocktails';

export const useGetCocktail = () => {
  const { code } = useParams<{ code: string }>();
  const { data, isLoading, error } = useGetCocktailsByCodeQuery(code!, { skip: !code });

  const isInvalidCode = !code || !AVAILABLE_COCKTAIL_CODES.includes(code as CocktailCode);
  const isEmptyData = !data || data.length === 0;

  if (error) {
    toast.error(t('cocktailApi.loadingFailed'));
  }

  return {
    data,
    isLoading,
    isInvalidCode,
    isEmptyData,
  };
};
