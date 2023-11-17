import React from 'react';

import styles from './AppButton.module.css';

export default function AppButton(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) {
  return <button {...props} className={styles.button} />;
}
