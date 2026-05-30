import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  badgeContent?: React.ReactNode;
}

export default function SectionHeader({ title, subtitle, backHref, badgeContent }: SectionHeaderProps) {
  return (
    <header className={styles.container}>
      <div className={styles.titleRow}>
        {backHref && (
          <Link href={backHref} className="btn-back" aria-label="العودة للصفحة السابقة">
            <ArrowRight size={24} aria-hidden="true" />
          </Link>
        )}
        <h1 className="page-title">{title}</h1>
        {badgeContent && (
          <div className={styles.badgeWrapper}>
            {badgeContent}
          </div>
        )}
      </div>
      {subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}
    </header>
  );
}
