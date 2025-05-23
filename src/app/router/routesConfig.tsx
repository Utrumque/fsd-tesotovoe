import CocktailPage from '../../pages/CocktailPage';
import NotFoundPage from '../../pages/NotFoundPage';
import Layout from 'widgets/Layout';
import { Navigate } from 'react-router-dom';
import { CocktailCodeGuard } from './guards';

export const routesConfig = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Navigate to="/margarita" replace />,
      },
      {
        path: ':code',
        element: <CocktailPage />,
        guards: [CocktailCodeGuard],
      },
      //{
      //  path: 'profile',
      //  element: <div>Профиль</div>,
      //  guards: [AuthGuard],
      //},
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];
