"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { X, Sparkles, ChevronLeft } from 'lucide-react';
import { useUIStore } from '../../../lib/store';
import { ALL_SEASONAL_EVENTS } from '../events';
import { getActiveEvents, getDismissalKey } from '../utils/scheduler';
import { SeasonalEvent } from '../types';

export default function SeasonalBanner() {
  const router = useRouter();
  const { isFocusMode } = useUIStore();

  const [mounted, setMounted] = useState(false);
  const [activeEvent, setActiveEvent] = useState<SeasonalEvent | null>(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  
  // Rotating message state
  const [messageIndex, setMessageIndex] = useState(0);
  const [fadeText, setFadeText] = useState(true);

  // Initialize and check active event on mount
  useEffect(() => {
    setMounted(true);
    
    // Check for dev-mode bypass query parameter: ?showEvent=event_id
    const searchParams = new URLSearchParams(window.location.search);
    const showEventId = searchParams.get('showEvent');

    if (showEventId) {
      const devEvent = ALL_SEASONAL_EVENTS.find(e => e.id === showEventId);
      if (devEvent) {
        setActiveEvent(devEvent);
        return;
      }
    }

    // Default scheduler logic
    const active = getActiveEvents(ALL_SEASONAL_EVENTS);
    if (active.length > 0) {
      // Pick highest priority matching event
      setActiveEvent(active[0]);
    }
  }, []);

  // Handle rotating spiritual messages if applicable
  const messages = activeEvent?.rotatingMessages;
  useEffect(() => {
    if (!messages || messages.length <= 1) return;

    const interval = setInterval(() => {
      // Step 1: Trigger text fade out
      setFadeText(false);
      
      // Step 2: Swap message and fade in after animation completes
      setTimeout(() => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setFadeText(true);
      }, 300); // Syncs with css fade transition time

    }, 7000); // Rotate every 7 seconds

    return () => clearInterval(interval);
  }, [messages]);

  // Reset text index if event changes
  useEffect(() => {
    setMessageIndex(0);
    setFadeText(true);
  }, [activeEvent]);

  // Dismiss event handler
  const handleDismiss = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!activeEvent) return;

    setIsAnimatingOut(true);

    // Wait for exit transition to complete (300ms) before removing from DOM
    setTimeout(() => {
      const dismissKey = getDismissalKey(activeEvent);
      localStorage.setItem(dismissKey, 'true');
      
      // Check if there's a next active event in the priority queue
      const remainingActive = getActiveEvents(ALL_SEASONAL_EVENTS);
      if (remainingActive.length > 0) {
        setActiveEvent(remainingActive[0]);
        setIsAnimatingOut(false);
      } else {
        setActiveEvent(null);
      }
    }, 300);
  }, [activeEvent]);

  // Banner click navigation handler
  const handleNavigation = useCallback(() => {
    if (!activeEvent) return;
    router.push(activeEvent.route);
  }, [activeEvent, router]);

  // Responsive width tracking
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Render constraints
  if (!mounted || isFocusMode || !activeEvent) return null;

  // Determine current active message (default to description if no rotating messages exist)
  const displayedMessage = messages && messages.length > 0 
    ? messages[messageIndex] 
    : activeEvent.description;

  // Inline styles for absolute robustness of layout, spacing, and dimensions
  const bannerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: isMobile ? '16px' : '28px',
    right: isMobile ? '16px' : '28px',
    left: isMobile ? '16px' : 'auto',
    zIndex: 1000,
    width: isMobile ? 'auto' : '420px',
    padding: isMobile ? '22px' : '28px',
    borderRadius: isMobile ? '24px' : '28px',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    background: activeEvent.theme.bg,
    borderColor: activeEvent.theme.border,
    color: activeEvent.theme.text,
    borderWidth: '1px',
    borderStyle: 'solid',
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.22)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
  };

  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '18px',
    left: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: activeEvent.theme.text,
    cursor: 'pointer',
    zIndex: 10,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isMobile ? '16px' : '20px',
    paddingLeft: '36px',
    width: '100%',
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.85rem',
    fontWeight: 800,
    padding: '6px 14px',
    borderRadius: '100px',
    background: 'rgba(255, 255, 255, 0.12)',
    color: activeEvent.theme.text,
    border: '1px solid rgba(255, 255, 255, 0.12)',
  };

  const iconWrapperStyle: React.CSSProperties = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    flexShrink: 0,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: isMobile ? '1.35rem' : '1.48rem',
    fontWeight: 850,
    color: activeEvent.theme.text,
    marginBottom: isMobile ? '12px' : '16px',
    lineHeight: 1.3,
    textAlign: 'right',
    marginRight: 0,
    marginLeft: 0,
  };

  const contentBoxStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: isMobile ? '14px 18px' : '18px 22px',
    borderRadius: '18px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRight: '4px solid var(--primary)',
    marginBottom: isMobile ? '18px' : '22px',
    minHeight: isMobile ? '68px' : '76px',
    justifyContent: 'center',
  };

  const quoteStyle: React.CSSProperties = {
    fontSize: isMobile ? '1.12rem' : '1.22rem',
    lineHeight: 1.85,
    textAlign: 'right',
    fontWeight: 700,
    margin: 0,
  };

  const ctaStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: isMobile ? '11px 22px' : '13px 26px',
    borderRadius: '16px',
    fontWeight: 850,
    fontSize: '0.95rem',
    background: activeEvent.theme.accent,
    color: activeEvent.theme.accent === '#ffffff' ? '#0f172a' : '#ffffff',
  };

  return (
    <div
      onClick={handleNavigation}
      className={`seasonal-banner glass ${isAnimatingOut ? 'seasonal-banner-exit' : 'seasonal-banner-enter'}`}
      style={bannerStyle}
      role="region"
      aria-label={`تذكير مناسبة: ${activeEvent.title}`}
    >
      {/* Close button (Absolute layout with generous spacing) */}
      <button
        onClick={handleDismiss}
        className="seasonal-banner-close"
        aria-label={`إغلاق تذكير ${activeEvent.title}`}
        title="إغلاق"
        style={closeButtonStyle}
      >
        <X size={16} aria-hidden="true" />
      </button>

      <div className="seasonal-banner-wrapper" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/* Top row: Context badge and large glowing event icon */}
        <div className="seasonal-banner-header" style={headerStyle}>
          <div className="seasonal-banner-badge" style={badgeStyle}>
            <Sparkles size={12} className="seasonal-banner-sparkle" aria-hidden="true" />
            <span>نفحات إيمانية</span>
          </div>
          
          <div className="seasonal-banner-icon-wrapper" style={iconWrapperStyle}>
            <span className="seasonal-banner-icon" aria-hidden="true" style={{ fontSize: '1.9rem', zIndex: 2, lineHeight: 1 }}>
              {activeEvent.icon}
            </span>
            <span className="seasonal-banner-icon-glow" style={{ background: activeEvent.theme.accent }}></span>
          </div>
        </div>

        {/* Separated Clean Title Row */}
        <h2 className="seasonal-banner-title" style={titleStyle}>
          {activeEvent.title}
        </h2>

        {/* Spacious centered spiritual message box */}
        <div className="seasonal-banner-content-box" style={contentBoxStyle}>
          <p 
            className={`seasonal-banner-quote arabic-text ${fadeText ? 'fade-in-text' : 'fade-out-text'}`}
            lang="ar"
            style={quoteStyle}
          >
            {displayedMessage}
          </p>
        </div>

        {/* Spacious, balanced CTA Button */}
        <div className="seasonal-banner-actions" style={{ display: 'flex', width: '100%' }}>
          <span 
            className="seasonal-banner-btn"
            style={ctaStyle}
          >
            <span>{activeEvent.ctaText || 'تصفح التفاصيل والأذكار'}</span>
            <ChevronLeft size={18} aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
}
