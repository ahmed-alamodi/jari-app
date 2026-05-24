"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, X } from 'lucide-react';
import categories from '../data/categories.json';

export default function AdhkarIndexClient() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <Link href="/" className="btn-back">
          <ArrowRight size={24} />
        </Link>
        <h1 className="page-title">فهرس حصن المسلم</h1>
      </div>

      {/* Search Input */}
      <div className="search-container glass" style={{
        display: 'flex',
        alignItems: 'center',
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '8px 14px',
        marginBottom: '20px',
        gap: '10px',
      }}>
        <Search size={18} style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="ابحث عن ذكر أو دعاء..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text)',
            fontSize: '1rem',
            width: '100%',
            outline: 'none',
          }}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* Grid List */}
      <div className="categories-list" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '12px',
      }}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/adhkar/${cat.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="category-card glass" style={{
                padding: '16px 20px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'var(--text)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '100%',
              }}>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: 'var(--primary)',
                  borderRadius: '10px',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  flexShrink: 0,
                }}>
                  {cat.id}
                </div>
                <div style={{ fontWeight: '500', fontSize: '1rem', lineHeight: '1.4' }}>
                  {cat.title}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            لم يتم العثور على نتائج تطابق بحثك.
          </div>
        )}
      </div>
    </div>
  );
}
