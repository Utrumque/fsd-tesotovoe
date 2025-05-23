import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ErrorBoundary.module.scss';
import type { ErrorBoundaryProps as OriginalErrorBoundaryProps, ErrorBoundaryState } from './types';

interface ErrorBoundaryProps extends OriginalErrorBoundaryProps {
  t: (key: string) => string;
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { t } = this.props;
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <h2>{t('errorBoundary.somethingWentWrong')}</h2>
          <p>{t('errorBoundary.refreshOrTryLater')}</p>
          <button className={styles.retryButton} onClick={() => window.location.reload()}>
            {t('errorBoundary.refreshPage')}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const ErrorBoundaryWithTranslation = (props: OriginalErrorBoundaryProps & { children: ReactNode }) => {
  const { t } = useTranslation();
  return <ErrorBoundary {...props} t={t} />;
};

export default ErrorBoundaryWithTranslation;
