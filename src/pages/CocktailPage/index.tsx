import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useGetCocktailsByCodeQuery } from 'entities/cocktail/api/cocktailApi';
import { AVAILABLE_COCKTAIL_CODES, type CocktailCode } from 'shared/constants/cocktails';
import { useVirtualScroll } from 'shared/lib';
import { CocktailCard } from 'widgets';

import type { FC } from 'react';
import styles from './CocktailPage.module.scss';

const ITEM_SIZE = 545;

const CocktailPage: FC = () => {
  const { t } = useTranslation();
  const { code } = useParams<{ code: string }>();
  const { data, isLoading, error } = useGetCocktailsByCodeQuery(code!, { skip: !code });

  const mappedRows = data?.map((row, index) => {
    return { id: index, data: row };
  });

  const virtualScrollData = useVirtualScroll({
    containerHeight: window.innerHeight,
    visibleRows: mappedRows,
    rowHeight: ITEM_SIZE,
  });

  if (!code || !AVAILABLE_COCKTAIL_CODES.includes(code as CocktailCode)) {
    return <Navigate to="/" replace />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>{t('cocktailPage.loadingError')}</h2>
        <p>{t('cocktailPage.loadingFailed')}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={styles.notFound}>
        <h2>{t('cocktailPage.cocktailNotFound')}</h2>
        <p>{t('cocktailPage.nothingFound')}</p>
      </div>
    );
  }

  return (
    <div
      className={styles.cocktailPage}
      ref={virtualScrollData.containerRef}
      onScroll={virtualScrollData.handleScroll}
      style={{ height: window.innerHeight }}
    >
      <div style={{ height: virtualScrollData.paddingTop }} />

      {virtualScrollData.visibleRows.map(cocktail => (
        <CocktailCard key={cocktail.id} cocktail={cocktail.data} isLoading={isLoading} />
      ))}

      <div style={{ height: virtualScrollData.paddingBottom }} />
    </div>
  );
};

export default CocktailPage;
