import React from 'react';

interface JariLogoProps {
  /** Logo size in pixels (sets both width and height for CLS prevention) */
  size?: number;
  /** Show the "جاري" wordmark text alongside the icon */
  showText?: boolean;
  className?: string;
  /**
   * Hint that this logo is LCP-critical (e.g. above-the-fold header logo).
   * Currently a semantic prop — used for future next/image integration.
   */
  priority?: boolean;
}

export default function JariLogo({
  size = 32,
  showText = true,
  className = '',
  priority = false,
}: JariLogoProps) {
  // Unique gradient IDs scoped per instance to avoid SVG id collisions
  const gradId = priority ? 'jariGrad-priority' : 'jariGrad';
  const goldId = priority ? 'goldGrad-priority' : 'goldGrad';

  return (
    <div
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
    >
      <svg
        /* Accessibility: role + aria-label + title for screen readers */
        role="img"
        aria-label="شعار جاري"
        /* Explicit dimensions prevent CLS by reserving space before paint */
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
        focusable="false"
      >
        {/* Screen reader accessible title */}
        <title>شعار تطبيق جاري</title>
        <defs>
          {/* Primary brand emerald gradient */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          {/* Accent gold gradient representing guidance and light */}
          <linearGradient id={goldId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>

        {/* Crescent moon representing worship and guidance */}
        <path
          d="M 70 20 A 20 20 0 1 0 70 60 A 22 22 0 0 1 70 20 Z"
          fill={`url(#${goldId})`}
        />

        {/* Three flowing waves representing Sadaqah Jariyah and ongoing remembrance */}
        {/* Primary Wave */}
        <path
          d="M 20 52 C 30 46, 40 46, 50 52 C 60 58, 70 58, 80 52"
          stroke={`url(#${gradId})`}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Secondary Wave */}
        <path
          d="M 15 62 C 26.6 56, 38.3 56, 50 62 C 61.6 68, 73.3 68, 85 62"
          stroke={`url(#${gradId})`}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        {/* Tertiary Wave */}
        <path
          d="M 26 72 C 34 67, 42 67, 50 72 C 58 77, 66 77, 74 72"
          stroke={`url(#${gradId})`}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </svg>

      {showText && (
        <span
          className="logo-text"
          aria-hidden="true" /* Logo link has aria-label; this text is decorative */
          style={{
            fontFamily: "'Tajawal', sans-serif",
            fontWeight: 800,
            fontSize: `${size * 0.75}px`,
            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
            lineHeight: 1,
          }}
        >
          جاري
        </span>
      )}
    </div>
  );
}
