/**
 * Hand-drawn decorative SVGs. Mediterranean motifs used sparingly
 * so they don't read as decoration for its own sake.
 */

export function OliveBranch({ className, size = 140 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.45}
      viewBox="0 0 200 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 70 Q 55 62, 105 55 Q 155 48, 195 42" />
      {/* leaves, alternating sides */}
      <g strokeWidth="1">
        <path d="M30 65 Q 26 50, 40 44 Q 46 56, 30 65Z" />
        <path d="M50 60 Q 60 48, 70 56 Q 66 70, 50 60Z" />
        <path d="M75 58 Q 70 42, 85 38 Q 92 50, 75 58Z" />
        <path d="M95 55 Q 105 42, 118 52 Q 112 65, 95 55Z" />
        <path d="M120 50 Q 116 34, 132 30 Q 138 44, 120 50Z" />
        <path d="M140 48 Q 152 34, 165 44 Q 158 57, 140 48Z" />
        <path d="M165 43 Q 162 28, 178 24 Q 184 38, 165 43Z" />
      </g>
      {/* olives */}
      <g fill="currentColor" stroke="none" opacity="0.55">
        <ellipse cx="62" cy="67" rx="2.5" ry="3.5" />
        <ellipse cx="108" cy="60" rx="2.5" ry="3.5" />
        <ellipse cx="150" cy="52" rx="2.5" ry="3.5" />
      </g>
    </svg>
  );
}

export function Meander({ className, tiles = 14, color }) {
  // Simple Greek-key pattern built in SVG — repeats cleanly at any width.
  return (
    <svg
      className={className}
      viewBox={`0 0 ${tiles * 28} 18`}
      width="100%"
      height="18"
      fill="none"
      stroke={color || 'currentColor'}
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden
    >
      <defs>
        <pattern id="aq-meander" x="0" y="0" width="28" height="18" patternUnits="userSpaceOnUse">
          <path d="M0 15 H4 V4 H12 V11 H8 V8 H20 V15 H24 V4 H28" />
        </pattern>
      </defs>
      <rect width="100%" height="18" fill="url(#aq-meander)" />
    </svg>
  );
}

export function SunMark({ className, size = 72 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="40" cy="40" r="13" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = 40 + Math.cos(a) * 20;
        const y1 = 40 + Math.sin(a) * 20;
        const x2 = 40 + Math.cos(a) * 30;
        const y2 = 40 + Math.sin(a) * 30;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
    </svg>
  );
}

export function Wave({ className, width = 140 }) {
  return (
    <svg
      className={className}
      width={width}
      height="14"
      viewBox="0 0 140 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M0 7 Q 10 1, 20 7 T 40 7 T 60 7 T 80 7 T 100 7 T 120 7 T 140 7" />
    </svg>
  );
}
