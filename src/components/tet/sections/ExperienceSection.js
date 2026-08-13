import React from 'react';
import { Building, Calendar, MapPin } from 'lucide-react';
import { MONO, PALETTE, SERIF } from '../theme';
import { EXPERIENCES } from '../../../content/portfolioData';

// Single-column timeline: a rail of ink dots down the left, one card per
// role. (The old alternating layout fights a 72vh drawer.)

export default function ExperienceSection() {
  return (
    <div style={{ position: 'relative', paddingLeft: 34 }}>
      <div style={{ position: 'absolute', left: 9, top: 8, bottom: 8, width: 2, background: PALETTE.rule }} />
      <div style={{ display: 'grid', gap: 22 }}>
        {EXPERIENCES.map((e) => (
          <div key={e.title + e.company} style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: -31, top: 26, width: 12, height: 12, borderRadius: '50%', background: e.current ? PALETTE.seal : PALETTE.ink, border: `2px solid ${PALETTE.linen}`, boxShadow: `0 0 0 2px ${PALETTE.rule}` }} />
            <div style={{ background: PALETTE.cardBg, border: `1px solid ${PALETTE.rule}`, borderRadius: 10, padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                <div style={{ font: `500 20px/1.3 ${SERIF}`, color: PALETTE.ink }}>{e.title}</div>
                {e.current && (
                  <span style={{ font: `10px/1 ${MONO}`, letterSpacing: '0.1em', textTransform: 'uppercase', color: PALETTE.seal, border: `1px solid ${PALETTE.seal}`, borderRadius: 999, padding: '4px 10px', whiteSpace: 'nowrap' }}>
                    Current
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px', font: `12px/1.6 ${MONO}`, color: PALETTE.engraved, marginBottom: 12 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Building size={13} color={PALETTE.seal} /> {e.company}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><MapPin size={13} /> {e.location}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Calendar size={13} /> {e.period}</span>
              </div>
              <p style={{ margin: '0 0 12px', font: `13.5px/1.7 ${MONO}`, color: PALETTE.inkSoft }}>{e.description}</p>
              <ul style={{ margin: '0 0 14px', padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
                {e.achievements.map((a) => (
                  <li key={a} style={{ font: `13px/1.65 ${MONO}`, color: PALETTE.inkSoft, paddingLeft: 16, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: PALETTE.seal }}>•</span>
                    {a}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {e.tech.map((t) => (
                  <span key={t} style={{ font: `11px/1 ${MONO}`, color: PALETTE.inkSoft, border: `1px solid ${PALETTE.rule}`, borderRadius: 999, padding: '5px 11px' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
