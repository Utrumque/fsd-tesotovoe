import NotFoundPage from 'pages/NotFoundPage';
import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { AVAILABLE_COCKTAIL_CODES } from 'shared/constants/cocktails';

export const CocktailCodeGuard = ({ children }: { children: ReactNode }) => {
  const { code } = useParams<{ code: string }>();
  if (!code || !AVAILABLE_COCKTAIL_CODES.includes(code as (typeof AVAILABLE_COCKTAIL_CODES)[number])) {
    return <NotFoundPage />;
  }
  return <>{children}</>;
};

// export const AuthGuard = ({ children }: { children: ReactNode }) => {
//  const isAuth = true; // заменить на useAuth() или аналог
//  if (!isAuth) return <div>Требуется авторизация</div>;
//  return <>{children}</>;
//};
