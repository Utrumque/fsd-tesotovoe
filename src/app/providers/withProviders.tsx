import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary, Toast } from 'shared/ui';

import { store } from '../store';

type ProviderType = (component: React.ReactNode) => React.ReactNode;

const withErrorBoundary: ProviderType = component => <ErrorBoundary>{component}</ErrorBoundary>;

const withStore: ProviderType = component => <Provider store={store}>{component}</Provider>;

const withRouter: ProviderType = component => (
  <BrowserRouter>
    {component}
    <Toast />
  </BrowserRouter>
);

const compose =
  (...providers: ProviderType[]) =>
  (component: React.ReactNode) =>
    providers.reduce((acc, provider) => provider(acc), component);

export const withProviders = compose(withErrorBoundary, withStore, withRouter);
