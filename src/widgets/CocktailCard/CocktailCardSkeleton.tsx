import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './CocktailCard.module.scss';

const CocktailCardSkeleton: React.FC = () => {
  return (
    <div className={styles.cocktailCard} data-testid="skeleton">
      <div className={styles.cocktailInfo}>
        <div className={styles.cocktailHeader}>
          <h2 className={styles.cocktailTitle}>
            <Skeleton width={180} height={32} />
          </h2>
          <div className={styles.cocktailMetaRow}>
            <span className={styles.cocktailMeta}>
              <Skeleton width={120} height={18} />
            </span>
            <span className={styles.cocktailMeta}>
              <Skeleton width={100} height={18} />
            </span>
            <span className={styles.cocktailMeta}>
              <Skeleton width={100} height={18} />
            </span>
          </div>
        </div>
        <section className={styles.cocktailSection}>
          <h3 className={styles.cocktailSectionTitle}>
            <Skeleton width={100} height={20} />
          </h3>
          <div className={styles.cocktailInstructions}>
            <Skeleton count={2} height={16} style={{ marginBottom: 4 }} />
          </div>
        </section>
        <section className={styles.cocktailSection}>
          <h3 className={styles.cocktailSectionTitle}>
            <Skeleton width={100} height={20} />
          </h3>
          <ul className={styles.cocktailIngredients}>
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <Skeleton width={120} height={16} />
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Skeleton className={styles.cocktailImage} width={260} height={260} style={{ borderRadius: 12 }} />
    </div>
  );
};

export default CocktailCardSkeleton;
