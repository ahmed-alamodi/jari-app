import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Tasbeeh from '../../components/Tasbeeh';

export default function TasbeehPage() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <Link href="/" className="btn-back">
          <ArrowRight size={24} />
        </Link>
        <h1 className="page-title">المسبحة</h1>
      </div>
      <div className="content-area">
        <Tasbeeh />
      </div>
    </div>
  );
}
