import React, { useEffect, useRef, useState } from 'react';
import { FileText, Github, Linkedin, Mail, X } from 'lucide-react';
import { MONO, PALETTE, SERIF, Z, asset } from './theme';
import { SOCIALS } from '../../content/portfolioData';

// Bottom-left dock: GitHub / LinkedIn / email (click = copy + mailto) and a
// Résumé pill that opens the PDF in an in-page popup viewer.

const iconBtn = {
  width: 40, height: 40, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: PALETTE.brown, background: 'transparent', border: '1px solid transparent',
  cursor: 'pointer', textDecoration: 'none', transition: 'background 160ms ease, border-color 160ms ease',
};

const hoverOn = (e) => {
  e.currentTarget.style.background = 'rgba(46,36,22,0.08)';
  e.currentTarget.style.borderColor = 'rgba(46,36,22,0.28)';
};
const hoverOff = (e) => {
  e.currentTarget.style.background = 'transparent';
  e.currentTarget.style.borderColor = 'transparent';
};

export default function SocialsDock() {
  const [copied, setCopied] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  // Esc closes the résumé popup; lock the page scroll while it's open
  useEffect(() => {
    if (!resumeOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setResumeOpen(false); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [resumeOpen]);

  const onEmail = () => {
    navigator.clipboard.writeText(SOCIALS.email).catch(() => {});
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
    window.location.href = `mailto:${SOCIALS.email}`;
  };

  return (
    <>
      <div style={{ position: 'fixed', left: 28, bottom: 24, zIndex: Z.chrome, display: 'flex', alignItems: 'center', gap: 8 }}>
        <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" style={iconBtn} onPointerEnter={hoverOn} onPointerLeave={hoverOff}>
          <Github size={20} />
        </a>
        <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" style={iconBtn} onPointerEnter={hoverOn} onPointerLeave={hoverOff}>
          <Linkedin size={20} />
        </a>
        <span style={{ position: 'relative', display: 'inline-flex' }}>
          <button type="button" onClick={onEmail} aria-label="Email (copies address)" title={SOCIALS.email} style={iconBtn} onPointerEnter={hoverOn} onPointerLeave={hoverOff}>
            <Mail size={20} />
          </button>
          {copied && (
            <span style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', font: `11px/1 ${MONO}`, color: PALETTE.linen, background: PALETTE.ink, borderRadius: 6, padding: '6px 10px' }}>
              copied ✓
            </span>
          )}
        </span>
        <button
          type="button"
          onClick={() => setResumeOpen(true)}
          aria-label="View résumé"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginLeft: 6,
            font: `500 12px/1 ${MONO}`, letterSpacing: '0.08em', color: PALETTE.brown,
            border: '1px solid rgba(46,36,22,0.35)', borderRadius: 999, padding: '10px 16px',
            cursor: 'pointer', background: 'rgba(232,220,196,0.35)',
          }}
        >
          <FileText size={14} /> Résumé
        </button>
      </div>

      {resumeOpen && (
        <div
          onClick={() => setResumeOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: Z.lightbox, background: 'rgba(15,10,5,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Résumé"
            onClick={(e) => e.stopPropagation()}
            style={{ width: 'min(920px, 92vw)', height: '90vh', background: PALETTE.linen, borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 12px 60px rgba(0,0,0,0.5)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: `1px solid ${PALETTE.rule}` }}>
              <span style={{ font: `400 18px/1 ${SERIF}`, color: PALETTE.ink }}>Résumé</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <a href={asset(SOCIALS.resume)} download="Nguyen_An_Resume.pdf" style={{ font: `12px/1 ${MONO}`, color: PALETTE.brown, borderBottom: `1px solid ${PALETTE.rule}`, textDecoration: 'none' }}>
                  Download
                </a>
                <button type="button" aria-label="Close résumé" onClick={() => setResumeOpen(false)} style={{ background: 'transparent', border: `1px solid ${PALETTE.rule}`, borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: PALETTE.ink, cursor: 'pointer' }}>
                  <X size={16} />
                </button>
              </div>
            </div>
            <iframe
              src={`${asset(SOCIALS.resume)}#navpanes=0&view=FitH`}
              title="An Nguyen résumé PDF"
              style={{ flex: 1, width: '100%', border: 'none', background: '#fff' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
