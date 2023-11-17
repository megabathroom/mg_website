import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

import styles from './AppBreadcrumbs.module.css';
import AppContainer from '../AppContainer/AppContainer';

export default function AppBreadcrumbs() {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([
    {
      breadcrumb: '',
      href: '',
    },
  ]);

  useEffect(() => {
    if (location) {
      const linkPath = location.pathname.split('/').filter(path => path !== '');

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: '/' + linkPath.slice(0, i + 1).join('/'),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [location]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav className={styles.breadcrumbs}>
      <AppContainer>
        <ol>
          <li>
            <Link to="/">home</Link>
          </li>
          {breadcrumbs.map((breadcrumb, index) => {
            return breadcrumb.breadcrumb ? (
              <li key={index}>
                <Link to={breadcrumb.href}>{breadcrumb.breadcrumb}</Link>
              </li>
            ) : null;
          })}
        </ol>
      </AppContainer>
    </nav>
  );
}
