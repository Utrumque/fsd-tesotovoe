import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CocktailCard.module.scss';
import CocktailCardSkeleton from './CocktailCardSkeleton';

import type { CocktailCardProps } from './types';

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail, isLoading }) => {
  const { t } = useTranslation();

  if (isLoading)
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <CocktailCardSkeleton key={i} />
        ))}
      </>
    );

  return (
    <div className={styles.cocktailCard}>
      <div className={styles.cocktailInfo}>
        <div className={styles.cocktailHeader}>
          <h2 className={styles.cocktailTitle}>{cocktail.strDrink}</h2>
          <div className={styles.cocktailMetaRow}>
            <span className={styles.cocktailMeta}>
              <b>{t('cocktailCard.category')}</b> {cocktail.strCategory}
            </span>
            <span className={styles.cocktailMeta}>
              <b>{t('cocktailCard.type')}</b> {cocktail.strAlcoholic}
            </span>
            <span className={styles.cocktailMeta}>
              <b>{t('cocktailCard.glass')}</b> {cocktail.strGlass}
            </span>
          </div>
        </div>
        <section className={styles.cocktailSection}>
          <h3 className={styles.cocktailSectionTitle}>{t('cocktailCard.instruction')}</h3>
          <div className={styles.cocktailInstructions}>{cocktail.strInstructions}</div>
        </section>
        <section className={styles.cocktailSection}>
          <h3 className={styles.cocktailSectionTitle}>{t('cocktailCard.ingredients')}</h3>
          <ul className={styles.cocktailIngredients}>
            {Array.from({ length: 15 }).map((_, i) => {
              const ingredientKey = `strIngredient${i + 1}` as keyof typeof cocktail;
              const measureKey = `strMeasure${i + 1}` as keyof typeof cocktail;
              const ingredient = String(cocktail[ingredientKey] || '');
              const measure = String(cocktail[measureKey] || '');
              if (!ingredient.trim()) return null;

              return (
                <li key={i}>
                  {measure ? `${measure} ` : ''}
                  {ingredient}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
      <img
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
        className={styles.cocktailImage}
        loading="lazy"
        onError={e => {
          const target = e.target as HTMLImageElement;

          target.src = '/placeholder-cocktail.jpg';
        }}
      />
    </div>
  );
};

export default CocktailCard;
