import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from 'shared/ui';
import { routesConfig } from './routesConfig';
import type { RouteConfig } from './types';

function applyGuards(element: React.ReactNode, guards: React.ComponentType<{ children: React.ReactNode }>[] = []) {
  return guards.reduceRight((acc, Guard) => <Guard>{acc}</Guard>, element);
}

function renderRoutes(routes: RouteConfig[]) {
  return routes.map(({ path, element, guards, children }, idx) => (
    <Route key={path + idx} path={path} element={applyGuards(element, guards)}>
      {children && renderRoutes(children)}
    </Route>
  ));
}

const AppRouter: React.FC = () => (
  <Suspense fallback={<Loader />}>
    <Routes>{renderRoutes(routesConfig)}</Routes>
  </Suspense>
);

export default AppRouter;
