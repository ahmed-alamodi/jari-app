"use client";

import { useState, useEffect } from 'react';
import { Moon, Sun, Maximize, Minimize } from 'lucide-react';
import Link from 'next/link';
import { useUIStore } from '../lib/store';

import JariLogo from './JariLogo';

export default function ThemeHeader() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isFocusMode, toggleFocusMode } = useUIStore();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className={`app-header ${isFocusMode ? 'focus-mode-header' : ''}`}>
      <div className="header-content glass">
        {!isFocusMode && (
          <Link
            href="/"
            className="logo"
            style={{ textDecoration: 'none' }}
            aria-label="جاري - الصفحة الرئيسية"
          >
            <JariLogo size={32} showText priority />
          </Link>
        )}

        {mounted && (
          <div
            className="header-actions"
            style={{
              display: 'flex',
              gap: '10px',
              marginLeft: isFocusMode ? 'auto' : '0',
            }}
          >
            <button
              className="theme-toggle"
              onClick={toggleFocusMode}
              aria-label={isFocusMode ? 'إلغاء وضع التركيز' : 'تفعيل وضع التركيز'}
              title={isFocusMode ? 'إلغاء وضع التركيز' : 'وضع التركيز'}
            >
              {isFocusMode ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDark ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
              title={isDark ? 'الوضع النهاري' : 'الوضع الليلي'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

