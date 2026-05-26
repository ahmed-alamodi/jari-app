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

  // Render constraints
  if (!mounted || isFocusMode || !activeEvent) return null;

  // Determine current active message (default to description if no rotating messages exist)
  const displayedMessage = messages && messages.length > 0 
    ? messages[messageIndex] 
    : activeEvent.description;

  return (
    <div
      onClick={handleNavigation}
      className={`seasonal-banner glass ${isAnimatingOut ? 'seasonal-banner-exit' : 'seasonal-banner-enter'}`}
      style={{
        background: activeEvent.theme.bg,
        borderColor: activeEvent.theme.border,
        color: activeEvent.theme.text,
      }}
      role="region"
      aria-label={`تذكير مناسبة: ${activeEvent.title}`}
    >
      {/* Close button (Propagation stopped to avoid click routing trigger) */}
      <button
        onClick={handleDismiss}
        className="seasonal-banner-close"
        aria-label={`إغلاق تذكير ${activeEvent.title}`}
        title="إغلاق"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: activeEvent.theme.text,
        }}
      >
        <X size={16} aria-hidden="true" />
      </button>

      <div className="seasonal-banner-wrapper">
        {/* Left header column containing badges and icons */}
        <div className="seasonal-banner-header">
          <div className="seasonal-banner-badge" style={{ background: 'rgba(255, 255, 255, 0.15)', color: activeEvent.theme.text }}>
            <Sparkles size={12} className="seasonal-banner-sparkle" />
            <span>{activeEvent.title}</span>
          </div>
          <span className="seasonal-banner-icon" aria-hidden="true">
            {activeEvent.icon}
          </span>
        </div>

        {/* Message container (Fading text wrapper for rotating reminders) */}
        <div className="seasonal-banner-content">
          <p 
            className={`seasonal-banner-quote arabic-text ${fadeText ? 'fade-in-text' : 'fade-out-text'}`}
            lang="ar"
          >
            {displayedMessage}
          </p>
        </div>

        {/* CTA Actions */}
        <div className="seasonal-banner-actions">
          <span 
            className="seasonal-banner-btn"
            style={{
              background: activeEvent.theme.accent,
              color: activeEvent.theme.accent === '#ffffff' ? '#111827' : '#ffffff',
            }}
          >
            {activeEvent.ctaText || 'انتقال للتصفح 🤲'}
            <ChevronLeft size={16} aria-hidden="true" style={{ marginRight: '4px' }} />
          </span>
        </div>
      </div>
    </div>
  );
}
