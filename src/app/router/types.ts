import type React from 'react';

export type RouteConfig = {
  path: string;
  element: React.ReactNode;
  guards?: React.ComponentType<{ children: React.ReactNode }>[];
  children?: RouteConfig[];
};
