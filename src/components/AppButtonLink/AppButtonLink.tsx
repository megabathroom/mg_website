import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import styles from './AppButtonLink.module.css';

export default function AppButtonLink(
  props: LinkProps & React.RefAttributes<HTMLAnchorElement>,
) {
  return <Link {...props} className={styles.button} />;
}
