import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LastTenPage() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <Link href="/" className="btn-back">
          <ArrowRight size={24} />
        </Link>
        <h1 className="page-title">أدعية ليالي العشر</h1>
      </div>
      <div className="content-area card glass">
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          محتوى أدعية ليالي العشر قيد التجهيز...
        </p>
      </div>
    </div>
  );
}
