import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { MONO, PALETTE, asset } from './theme';

// Shared photo carousel: always-visible arrows, a dot per image, 5s
// auto-advance that pauses on hover and resets on manual navigation.
// Renders only the current image (lazy) and pre-warms the next one.

export default function Carousel({ images, alt = '', height = 260, onExpand }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef(null);
  const many = images.length > 1;

  const go = (next) => setIndex((i) => (i + next + images.length) % images.length);

  useEffect(() => {
    if (!many || hovered) return undefined;
    timerRef.current = setInterval(() => go(1), 5000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [many, hovered, index]); // index dep restarts the interval after manual nav

  useEffect(() => {
    if (!many) return;
    const im = new Image();
    im.src = asset(images[(index + 1) % images.length]);
  }, [index, images, many]);

  const navBtn = (side, dir, Icon) => (
    <button
      type="button"
      aria-label={dir > 0 ? 'Next image' : 'Previous image'}
      onClick={(e) => { e.stopPropagation(); go(dir); }}
      style={{
        position: 'absolute', top: '50%', [side]: 10, transform: 'translateY(-50%)',
        width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(46,36,22,0.55)', color: PALETTE.linen,
      }}
    >
      <Icon size={18} />
    </button>
  );

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={{ position: 'relative', width: '100%', height, borderRadius: 8, overflow: 'hidden', background: 'rgba(46,36,22,0.08)' }}
    >
      {/* keyed remount = fade-in over the placeholder; exit choreography
          (AnimatePresence mode="wait") wedges under StrictMode remounts */}
      <motion.img
        key={index}
        src={asset(images[index])}
        alt={alt ? `${alt} ${index + 1}` : ''}
        loading="lazy"
        decoding="async"
        draggable={false}
        onClick={() => onExpand && onExpand(images, index)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: onExpand ? 'zoom-in' : 'default' }}
      />

      {onExpand && hovered && (
        <div style={{ position: 'absolute', top: 10, right: 10, pointerEvents: 'none', background: 'rgba(46,36,22,0.55)', color: PALETTE.linen, borderRadius: 6, padding: 6, display: 'flex' }}>
          <Maximize2 size={14} />
        </div>
      )}

      {many && navBtn('left', -1, ChevronLeft)}
      {many && navBtn('right', 1, ChevronRight)}

      {many && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 8, display: 'flex', justifyContent: 'center', gap: 6 }}>
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={(e) => { e.stopPropagation(); setIndex(i); }}
              style={{
                width: 7, height: 7, borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer',
                background: i === index ? PALETTE.linen : 'rgba(232,220,196,0.45)',
                boxShadow: '0 0 3px rgba(30,20,8,0.5)',
              }}
            />
          ))}
        </div>
      )}

      {many && (
        <div style={{ position: 'absolute', right: 10, bottom: 24, font: `11px/1 ${MONO}`, color: PALETTE.linen, background: 'rgba(46,36,22,0.55)', borderRadius: 4, padding: '3px 7px' }}>
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
