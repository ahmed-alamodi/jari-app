import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ComprehensivePage() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <Link href="/" className="btn-back">
          <ArrowRight size={24} />
        </Link>
        <h1 className="page-title">جوامع الدعاء</h1>
      </div>
      <div className="content-area card glass">
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          محتوى جوامع الدعاء قيد التجهيز...
        </p>
      </div>
    </div>
  );
}
