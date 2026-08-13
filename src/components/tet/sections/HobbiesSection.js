import React from 'react';
import { Car, Dumbbell, Gamepad2, Plane, Tv } from 'lucide-react';
import { MONO, PALETTE, SERIF } from '../theme';
import { HOBBIES } from '../../../content/portfolioData';
import Carousel from '../Carousel';

const ICONS = { Plane, Car, Tv, Dumbbell, Gamepad2 };

export default function HobbiesSection({ openLightbox }) {
  return (
    <div>
      <p style={{ margin: '0 0 22px', font: `14px/1.7 ${MONO}`, color: PALETTE.engraved }}>
        Outside of my technical background, here are some of my current hobbies...
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 22 }}>
        {HOBBIES.map((h) => {
          const Icon = ICONS[h.icon] || Plane;
          return (
            <div key={h.title} style={{ background: PALETTE.cardBg, border: `1px solid ${PALETTE.rule}`, borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 38, height: 38, borderRadius: 9, background: 'rgba(179,64,42,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <Icon size={20} color={PALETTE.seal} />
                </span>
                <div>
                  <div style={{ font: `500 19px/1.2 ${SERIF}`, color: PALETTE.ink }}>{h.title}</div>
                  <div style={{ font: `11px/1.5 ${MONO}`, letterSpacing: '0.08em', textTransform: 'uppercase', color: PALETTE.engraved }}>{h.subtitle}</div>
                </div>
              </div>
              <Carousel images={h.images} alt={h.title} height={210} onExpand={openLightbox} />
              <p style={{ margin: 0, font: `13px/1.7 ${MONO}`, color: PALETTE.inkSoft }}>{h.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
