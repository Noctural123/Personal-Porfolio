import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { MONO, PALETTE, Z, asset } from './theme';

// Expanded-image modal. Sits above the drawer; Esc/arrows are handled here
// with stopPropagation so the drawer underneath stays open.

export default function Lightbox({ images, index, onIndex, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); }
      else if (e.key === 'ArrowRight') onIndex((index + 1) % images.length);
      else if (e.key === 'ArrowLeft') onIndex((index - 1 + images.length) % images.length);
    };
    // capture phase so the drawer's own Esc handler never sees the event
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [images.length, index, onIndex, onClose]);

  const btn = {
    background: 'rgba(232,220,196,0.12)', color: PALETTE.linen, border: 'none',
    borderRadius: '50%', width: 42, height: 42, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: Z.lightbox, background: 'rgba(15,10,5,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <img
        src={asset(images[index])}
        alt=""
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '86vw', maxHeight: '86vh', objectFit: 'contain', borderRadius: 6, boxShadow: '0 10px 60px rgba(0,0,0,0.6)' }}
      />
      <button type="button" aria-label="Close image" onClick={onClose} style={{ ...btn, position: 'absolute', top: 24, right: 28 }}>
        <X size={22} />
      </button>
      {images.length > 1 && (
        <>
          <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + images.length) % images.length); }} style={{ ...btn, position: 'absolute', left: 28, top: '50%', transform: 'translateY(-50%)' }}>
            <ChevronLeft size={24} />
          </button>
          <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % images.length); }} style={{ ...btn, position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)' }}>
            <ChevronRight size={24} />
          </button>
          <div style={{ position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)', font: `13px/1 ${MONO}`, color: PALETTE.linen }}>
            {index + 1} / {images.length}
          </div>
        </>
      )}
    </motion.div>
  );
}
