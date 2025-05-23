import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h1>404</h1>
      <p>{t('notFoundPage.pageNotFound')}</p>
    </div>
  );
};

export default NotFoundPage;
