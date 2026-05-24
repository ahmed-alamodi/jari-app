"use client";

import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import DhikrCard from './DhikrCard';

interface DhikrItem {
  id: string;
  text: string;
  count: number;
  info: string;
  audioUrl?: string;
}

interface DynamicDhikrSectionProps {
  title: string;
  categoryId: string;
  adhkar: DhikrItem[];
}

export default function DynamicDhikrSection({ title, categoryId, adhkar }: DynamicDhikrSectionProps) {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <Link href="/adhkar" className="btn-back">
          <ArrowRight size={24} />
        </Link>
        <h1 className="page-title" style={{ fontSize: '1.2rem', maxWidth: '80%' }}>{title}</h1>
      </div>
      
      <div className="content-area">
        {adhkar && adhkar.length > 0 ? (
          <>
            <div className="dhikr-info-banner glass" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              borderRadius: '12px',
              marginBottom: '16px',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
            }}>
              <Info size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <span>اضغط على البطاقة لتسجيل تقدم القراءة اليومي.</span>
            </div>
            
            {adhkar.map((dhikr) => (
              <DhikrCard 
                key={dhikr.id} 
                dhikr={{
                  id: dhikr.id,
                  text: dhikr.text,
                  info: dhikr.info,
                  count: dhikr.count,
                  audioUrl: dhikr.audioUrl
                }} 
              />
            ))}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            عذراً، لم نتمكن من تحميل أذكار هذا القسم. يرجى التحقق من اتصالك بالإنترنت.
          </div>
        )}
      </div>
    </div>
  );
}
