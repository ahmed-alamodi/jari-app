"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import categories from '../../../data/categories.json';

import Badge from '../../ui/Badge';
import { Card } from '../../ui/Card';
import SearchInput from '../../ui/SearchInput';
import SectionHeader from '../../ui/SectionHeader';
import styles from './AdhkarIndexClient.module.css';

export default function AdhkarIndexClient() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stagger configurations for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 18,
      },
    },
  };

  return (
    <div className="animate-fade-in">
      {/* Section Header */}
      <SectionHeader
        title="فهرس حصن المسلم"
        subtitle="تصفح وابحث في القائمة الكاملة لأذكار وأدعية كتاب حصن المسلم المأثورة."
        backHref="/"
        badgeContent={<span>{categories.length} قسماً</span>}
      />

      {/* Search Input Box */}
      <div style={{ marginBottom: '24px' }}>
        <SearchInput
          placeholder="ابحث عن ذكر أو دعاء..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
          aria-label="ابحث في فهرس حصن المسلم"
        />
      </div>

      {/* Results Count / Accessibility announcement */}
      <span className={styles.resultsCount} aria-live="polite">
        {searchQuery ? `تم العثور على ${filteredCategories.length} من الأقسام` : ''}
      </span>

      {/* Category Grid List */}
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={cardVariants}
              layout="position"
            >
              <Link
                href={`/adhkar/${cat.slug}`}
                style={{ textDecoration: 'none' }}
                aria-label={`${cat.title} - القسم رقم ${cat.id}`}
              >
                <Card interactive={true} className="ui-card-interactive">
                  <Badge variant="primary">{cat.id}</Badge>
                  <span className={styles.categoryTitle}>{cat.title}</span>
                  <ChevronLeft size={18} className={styles.chevron} aria-hidden="true" />
                </Card>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <span style={{ fontSize: '2rem' }} aria-hidden="true">🔍</span>
            <p>لم يتم العثور على نتائج تطابق بحثك: "{searchQuery}"</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
