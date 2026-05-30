import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'muted';
}

export default function Badge({ children, className = '', variant = 'primary' }: BadgeProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    flexShrink: 0,
    width: '36px',
    height: '36px',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          background: 'rgba(16, 185, 129, 0.08)',
          color: 'var(--primary)',
        };
      case 'secondary':
        return {
          background: 'rgba(13, 148, 136, 0.08)',
          color: 'var(--primary-dark)',
        };
      case 'muted':
      default:
        return {
          background: 'var(--border)',
          color: 'var(--text-muted)',
        };
    }
  };

  return (
    <div
      style={{ ...baseStyle, ...getVariantStyles() }}
      className={`ui-badge ${className}`}
    >
      {children}
    </div>
  );
}
