/**
 * Breadcrumb — RTL-aware breadcrumb component (visual + schema).
 *
 * Renders a visible breadcrumb trail and injects BreadcrumbList JSON-LD.
 * Designed for Arabic RTL with proper aria attributes and semantics.
 *
 * Usage:
 *   <Breadcrumb items={[
 *     { name: 'الرئيسية', path: '/' },
 *     { name: 'فهرس حصن المسلم', path: '/adhkar' },
 *     { name: 'أذكار الصباح', path: '/adhkar/azkar-alsabah' },
 *   ]} />
 */

import Link from 'next/link';
import JsonLd from './JsonLd';
import { buildBreadcrumbSchema } from '@/lib/seo/schema';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Hide visual breadcrumb but keep schema (default: false) */
  schemaOnly?: boolean;
}

export default function Breadcrumb({ items, schemaOnly = false }: BreadcrumbProps) {
  const schema = buildBreadcrumbSchema(items);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd schema={schema} />

      {/* Visual Breadcrumb */}
      {!schemaOnly && (
        <nav
          aria-label="مسار التنقل"
          className="breadcrumb-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexWrap: 'wrap',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '16px',
            direction: 'rtl',
          }}
        >
          <ol
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              flexWrap: 'wrap',
            }}
          >
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li
                  key={item.path}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {isLast ? (
                    <span
                      itemProp="name"
                      aria-current="page"
                      style={{ color: 'var(--primary)', fontWeight: 600 }}
                    >
                      {item.name}
                    </span>
                  ) : (
                    <>
                      <Link
                        href={item.path}
                        itemProp="item"
                        className="breadcrumb-link"
                        style={{
                          color: 'var(--text-muted)',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        <span itemProp="name">{item.name}</span>
                      </Link>
                      {/* RTL-aware separator (‹ points right-to-left) */}
                      <span aria-hidden="true" style={{ opacity: 0.5 }}>
                        ‹
                      </span>
                    </>
                  )}
                  <meta itemProp="position" content={String(index + 1)} />
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
}
