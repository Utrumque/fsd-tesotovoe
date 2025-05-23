import { createRoot } from 'react-dom/client';
import { withProviders } from './providers/withProviders';
import AppRouter from './router/AppRouter';

import 'shared/styles/index.scss';
import './i18n';

createRoot(document.getElementById('root')!).render(withProviders(<AppRouter />));
