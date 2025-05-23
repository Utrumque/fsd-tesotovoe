import React from 'react';

import styles from './Loader.module.scss';

export const Loader: React.FC = () => (
  <div className={styles.loader} data-testid="loader">
    <div className={styles.spinner} data-testid="spinner" />
  </div>
);
