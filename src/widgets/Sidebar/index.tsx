import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AVAILABLE_COCKTAIL_CODES } from 'shared/constants/cocktails';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className={styles.menuButton} onClick={toggleSidebar} aria-label={t('sidebar.openMenu')}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar} data-testid="sidebar-overlay" />}
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} data-testid="sidebar">
        <ul className={styles.navList}>
          {AVAILABLE_COCKTAIL_CODES.map((code, idx) => {
            const isActive = location.pathname === `/${code}` || (location.pathname === '/' && idx === 0);

            return (
              <li key={code} className={isActive ? styles.active : ''} data-testid={isActive ? 'sidebar-active' : undefined}>
                <NavLink to={`/${code}`} onClick={() => setIsOpen(false)}>
                  {code.charAt(0).toUpperCase() + code.slice(1)}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
