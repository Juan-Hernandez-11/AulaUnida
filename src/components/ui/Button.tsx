import React from 'react';
import styles from './Button.module.css';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
  icon?: React.ReactNode;
};

export default function Button({ variant = 'primary', icon, children, className, ...rest }: Props) {
  const cls = `${variant === 'primary' ? styles.primary : styles.ghost} ${className || ''}`.trim();
  return (
    <button {...rest} className={cls}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
