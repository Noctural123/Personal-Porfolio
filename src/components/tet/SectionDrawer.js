import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { MONO, PALETTE, SERIF, Z } from './theme';
import { SECTIONS } from '../../content/portfolioData';
import Lightbox from './Lightbox';
import AboutSection from './sections/AboutSection';
import HobbiesSection from './sections/HobbiesSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';

// Paper-scroll drawer: slides up from the bottom over a dimmed hero. The
// panel itself stays mounted while bulbs are swapped — only the inner
// content crossfades — so switching sections never bounces the sheet.

const BODIES = {
  about: AboutSection,
  hobbies: HobbiesSection,
  projects: ProjectsSection,
  experience: ExperienceSection,
  contact: ContactSection,
};

export default function SectionDrawer({ activeSection, onSelect, onClose }) {
  const open = activeSection != null;
  const scrollRef = useRef(null);
  const [lightbox, setLightbox] = useState(null); // { images, index } | null

  // lock the page scroll while open (the hero is 130vh); compensate the
  // scrollbar width so the linen doesn't shift when it disappears
  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // fresh section starts at the top
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    setLightbox(null);
  }, [activeSection]);

  const meta = open ? SECTIONS[activeSection] : null;
  const Body = open ? BODIES[activeSection] : null;
  const openLightbox = (images, index) => setLightbox({ images, index });

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: Z.backdrop, background: 'rgba(24,17,8,0.38)', cursor: 'pointer' }}
          />
        )}
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={meta.title}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: 'fixed', left: 0, right: 0, bottom: 0, height: '72vh', zIndex: Z.drawer,
              background: PALETTE.linen, borderRadius: '18px 18px 0 0',
              borderTop: '1px solid rgba(46,36,22,0.35)',
              boxShadow: '0 -18px 60px rgba(30,20,8,0.35)', overflow: 'hidden',
            }}
          >
            <div className="tet-grain" style={{ position: 'absolute', inset: 0, opacity: 0.07, mixBlendMode: 'multiply', pointerEvents: 'none' }} />

            {/* header */}
            <div style={{ position: 'relative', padding: '26px 48px 14px', borderBottom: `1px solid ${PALETTE.rule}` }}>
              <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ font: `12px/1 ${MONO}`, letterSpacing: '0.22em', textTransform: 'uppercase', color: PALETTE.engraved, marginBottom: 8 }}>
                    {meta.label}
                  </div>
                  <h2 style={{ margin: 0, font: `400 34px/1.1 ${SERIF}`, color: PALETTE.ink }}>{meta.title}</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
                  {/* the open drawer hides the other bulbs, so keep every
                      section one click away from inside it */}
                  <nav style={{ display: 'flex', gap: 18 }}>
                    {Object.entries(SECTIONS).map(([id, s]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => onSelect && onSelect(id)}
                        style={{
                          background: 'none', border: 'none', padding: '2px 0', cursor: 'pointer',
                          font: `12px/1 ${MONO}`, letterSpacing: '0.12em', textTransform: 'uppercase',
                          color: id === activeSection ? PALETTE.seal : PALETTE.engraved,
                          borderBottom: id === activeSection ? `1px solid ${PALETTE.seal}` : '1px solid transparent',
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </nav>
                  <button
                    type="button"
                    autoFocus
                    aria-label="Close"
                    onClick={onClose}
                    style={{ background: 'transparent', border: `1px solid ${PALETTE.rule}`, borderRadius: 8, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: PALETTE.ink, cursor: 'pointer', flex: 'none' }}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* scrollable body — content crossfades when bulbs swap */}
            <div ref={scrollRef} style={{ position: 'relative', height: 'calc(100% - 103px)', overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', padding: '26px 48px 56px' }}>
              {/* keyed remount = instant swap with a short fade-in; no exit
                  choreography (AnimatePresence mode="wait" could wedge the
                  entering child at opacity 0 on rapid section swaps) */}
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ maxWidth: 1100, margin: '0 auto' }}
              >
                {Body && <Body openLightbox={openLightbox} />}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            index={lightbox.index}
            onIndex={(i) => setLightbox((lb) => ({ ...lb, index: i }))}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
