"use client";

import { useEffect } from 'react';
import { useUIStore } from '../lib/store';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const { isFocusMode } = useUIStore();

  useEffect(() => {
    if (isFocusMode) {
      document.body.classList.add('focus-mode-active');
    } else {
      document.body.classList.remove('focus-mode-active');
    }
  }, [isFocusMode]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('Service Worker registered successfully with scope:', reg.scope);
        })
        .catch((err) => {
          console.error('Service Worker registration failed:', err);
        });
    }
  }, []);

  return <>{children}</>;
}
