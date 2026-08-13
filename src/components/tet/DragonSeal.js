import React, { useState } from 'react';
import { PALETTE, SERIF, Z } from './theme';

// The site's signature: a cinnabar seal (con dấu) bearing a stylized dragon,
// which doubles as the contact CTA. A curved arrow "engraved" into the linen
// (same brown as the background dragon line-art, doubled stroke for the
// embossed look) points at it with a small caption.

function DragonMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <g stroke="#F5EDE0" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* body: an S-coil rising from the tail (bottom-left) to the neck */}
        <path d="M7 41 C 13 42.5, 20 40, 22.5 35 C 25 30, 21 26.5, 17.5 28 C 14.5 29.3, 14.8 33, 18 33.6 M22.5 35 C 26 30, 30 26, 30.5 20.5" strokeWidth="3" />
        {/* head: brow sweeping into snout, then the jaw */}
        <path d="M30.5 20.5 C 29.5 15.5, 33 11.5, 37.5 11.5 C 41 11.5, 43 14, 42.5 16.5 L 37 17.5" strokeWidth="2.6" />
        <path d="M37 17.5 C 38 20, 40.5 20.8, 42.8 20.2" strokeWidth="1.8" />
        {/* antler-style horns */}
        <path d="M34.5 11.8 C 33.5 8.5, 34.8 5.5, 37.5 4.5 M35.8 7.8 L 33.2 6.8" strokeWidth="1.7" />
        <path d="M39.5 11.6 C 39.8 8.8, 42 6.8, 44.5 6.8" strokeWidth="1.7" />
        {/* whisker curls off the snout */}
        <path d="M42.8 16.2 C 45.5 17, 46.5 19.5, 45 21.8" strokeWidth="1.3" />
        {/* mane flowing back from the head */}
        <path d="M31 14.5 C 28.5 13.5, 26.5 13.8, 24.8 15.2 M31.5 17.5 C 29 17.2, 27.2 18, 26 19.6" strokeWidth="1.5" />
        {/* foreleg + claws under the neck */}
        <path d="M28.5 24.5 L 26 28.5 M26 28.5 L 22.8 27.8 M26 28.5 L 25.2 31.8 M26 28.5 L 28.8 30.4" strokeWidth="1.6" />
        {/* dorsal spines along the coil */}
        <path d="M25.5 31 L 28.2 32.6 M27.5 26.5 L 30.4 27.6 M28.9 22.4 L 31.8 23" strokeWidth="1.4" />
        {/* tail fin */}
        <path d="M7 41 C 8.5 38.5, 8.5 36.5, 7.5 34.5 M7 41 C 5.5 38.8, 4.8 36.8, 5.2 34.6" strokeWidth="1.6" />
      </g>
      {/* eye */}
      <circle cx="35.8" cy="14.6" r="1.6" fill="#F5EDE0" />
    </svg>
  );
}

export default function DragonSeal({ active, onOpen }) {
  const [hover, setHover] = useState(false);

  const scale = active ? 0.96 : hover ? 1.07 : 1;

  return (
    <div style={{ position: 'fixed', right: 36, bottom: 30, zIndex: Z.chrome }}>
      {/* engraved arrow: sketch-brown arc + offset ghost stroke, arcing from
          the caption down-right into the seal */}
      <svg width="230" height="130" viewBox="0 0 230 130" aria-hidden="true" style={{ position: 'absolute', right: 44, bottom: 26, pointerEvents: 'none', overflow: 'visible' }}>
        <g fill="none" strokeLinecap="round">
          <path d="M 18 26 Q 110 2, 196 96" stroke={PALETTE.engraved} strokeWidth="1.6" opacity="0.28" transform="translate(0.9 0.9)" />
          <path d="M 18 26 Q 110 2, 196 96" stroke={PALETTE.engraved} strokeWidth="1.5" opacity="0.6" />
          <path d="M 186 84 L 196 96 L 182 94" stroke={PALETTE.engraved} strokeWidth="1.5" opacity="0.6" />
        </g>
      </svg>
      <span style={{ position: 'absolute', right: 236, bottom: 132, whiteSpace: 'nowrap', font: `italic 15px/1 ${SERIF}`, color: PALETTE.engraved, opacity: 0.85, transform: 'rotate(-7deg)', pointerEvents: 'none' }}>
        say hello
      </span>

      <button
        type="button"
        aria-label="Open contact form"
        title="Contact me"
        onClick={onOpen}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        style={{
          width: 62, height: 62, borderRadius: 12, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: PALETTE.seal,
          boxShadow: active
            ? 'inset 0 0 18px rgba(90,20,10,0.75), 0 1px 4px rgba(40,20,8,0.3)'
            : 'inset 0 0 14px rgba(90,20,10,0.55), 0 3px 10px rgba(40,20,8,0.35)',
          transform: `rotate(-4deg) scale(${scale})`,
          transition: 'transform 160ms ease, box-shadow 160ms ease',
        }}
      >
        <DragonMark size={42} />
      </button>
    </div>
  );
}
