import React, { useEffect, useRef, useState } from 'react';
import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { MONO, PALETTE, Z, asset } from './theme';
import { SOCIALS } from '../../content/portfolioData';

// Bottom-left dock: GitHub / LinkedIn / email (click = copy + mailto) and a
// labeled résumé pill so the CV reads as a call-to-action, not a mystery icon.

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
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const onEmail = () => {
    navigator.clipboard.writeText(SOCIALS.email).catch(() => {});
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
    window.location.href = `mailto:${SOCIALS.email}`;
  };

  return (
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
      <a
        href={asset(SOCIALS.resume)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open résumé PDF"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginLeft: 6,
          font: `500 12px/1 ${MONO}`, letterSpacing: '0.08em', color: PALETTE.brown,
          border: '1px solid rgba(46,36,22,0.35)', borderRadius: 999, padding: '10px 16px',
          textDecoration: 'none', background: 'rgba(232,220,196,0.35)',
        }}
      >
        <FileText size={14} /> Résumé
      </a>
    </div>
  );
}
