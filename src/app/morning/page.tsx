import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { morningAdhkar } from '../../data/adhkar';
import DhikrCard from '../../components/DhikrCard';
import SessionComplete from '../../components/SessionComplete';

export default function MorningPage() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <Link href="/" className="btn-back">
          <ArrowRight size={24} />
        </Link>
        <h1 className="page-title">أذكار الصباح</h1>
      </div>
      <div className="content-area">
        {morningAdhkar.map(dhikr => <DhikrCard key={dhikr.id} dhikr={dhikr} />)}
        <SessionComplete type="morning" />
      </div>
    </div>
  );
}
