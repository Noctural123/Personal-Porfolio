import React, { useState } from 'react';
import { MONO, PALETTE, SERIF, asset } from './theme';

// Easter egg: the ink-brush dragon, dyed dark crimson and ingrained into the
// linen at the very bottom-right of the page (absolute — it stays with the
// artwork, not the window). dragon_crimson.png is a pre-processed copy of
// dragon.png where ink darkness became alpha, so there is no paper box and
// the multiply blend lets the fabric weave show through the strokes.
// Clicking it opens a lion-dance video; hovering reveals a tooltip.

const VIDEO_URL = 'https://www.youtube.com/watch?v=Z6F6Vwl6jEA';

export default function DragonSeal() {
  const [hover, setHover] = useState(false);

  return (
    // no z-index on this wrapper: it would form a stacking context and
    // isolate the img's multiply blend from the linen behind it
    <div style={{ position: 'absolute', right: 14, bottom: 0, pointerEvents: 'none' }}>
      {/* caption + short engraved arrow arcing into the dragon */}
      <span style={{ position: 'absolute', right: 88, bottom: 96, whiteSpace: 'nowrap', font: `italic 13px/1 ${SERIF}`, color: PALETTE.engraved, opacity: 0.85, transform: 'rotate(-7deg)' }}>
        watch me dance
      </span>
      <svg width="56" height="45" viewBox="0 0 90 70" aria-hidden="true" style={{ position: 'absolute', right: 50, bottom: 56, overflow: 'visible' }}>
        <g fill="none" strokeLinecap="round">
          <path d="M 6 12 Q 50 6, 74 52" stroke={PALETTE.engraved} strokeWidth="1.6" opacity="0.28" transform="translate(0.9 0.9)" />
          <path d="M 6 12 Q 50 6, 74 52" stroke={PALETTE.engraved} strokeWidth="1.5" opacity="0.6" />
          <path d="M 66 43 L 74 52 L 61 50" stroke={PALETTE.engraved} strokeWidth="1.5" opacity="0.6" />
        </g>
      </svg>

      {hover && (
        <span style={{ position: 'absolute', right: 4, bottom: 90, whiteSpace: 'nowrap', font: `12px/1.5 ${MONO}`, color: PALETTE.linen, background: PALETTE.ink, borderRadius: 6, padding: '8px 12px', boxShadow: '0 2px 8px rgba(30,20,8,0.35)' }}>
          I&apos;m the tail in the light blue one that walks in
        </span>
      )}

      <a
        href={VIDEO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Watch me lion dance on YouTube"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        style={{ display: 'block', pointerEvents: 'auto', cursor: 'pointer' }}
      >
        <img
          src={asset('/dragon_crimson.png')}
          alt="Ink brush dragon"
          draggable={false}
          style={{
            width: 85, height: 85, objectFit: 'contain', display: 'block',
            mixBlendMode: 'multiply',
            opacity: hover ? 0.95 : 0.72,
            transform: `scale(${hover ? 1.38 : 1.32})`,
            transition: 'opacity 180ms ease, transform 180ms ease',
          }}
        />
      </a>
    </div>
  );
}
