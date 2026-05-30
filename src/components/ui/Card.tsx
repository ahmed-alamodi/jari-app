import React, { forwardRef } from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', interactive = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`glass ${styles.card} ${interactive ? styles.interactive : ''} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
