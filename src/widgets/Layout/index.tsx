import { Outlet } from 'react-router-dom';

import SidebarWidget from '../Sidebar';

import styles from './Layout.module.scss';
import type { FC } from 'react';

const Layout: FC = () => (
  <div className={styles.layout} data-testid="layout">
    <SidebarWidget />
    <main className={styles.main} data-testid="main">
      <Outlet />
    </main>
  </div>
);

export default Layout;
