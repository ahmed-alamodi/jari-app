import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

export default function ArafahPage() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <Link href="/" className="btn-back">
          <ArrowRight size={24} />
        </Link>
        <h1 className="page-title">أدعية يوم عرفة</h1>
      </div>
      <div className="content-area card glass">
        <p className="arabic-text" style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>
          «لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير»
        </p>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          هنا تجد ملفاً يحتوي على مجموعة من أدعية يوم عرفة لفضله العظيم.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a href="/files/arafah-prayers.pdf" download className="btn-download">
            <Download size={20} />
            تحميل كتاب الأدعية (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}
