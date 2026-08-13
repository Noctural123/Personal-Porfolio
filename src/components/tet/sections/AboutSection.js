import React from 'react';
import { Award, Calendar, GraduationCap, MapPin, Star, Users } from 'lucide-react';
import { MONO, PALETTE, SERIF, asset } from '../theme';
import { ABOUT_BULLETS, EDUCATION, LEADERSHIP, SOCIALS } from '../../../content/portfolioData';
import Carousel from '../Carousel';

const card = {
  background: PALETTE.cardBg,
  border: `1px solid ${PALETTE.rule}`,
  borderRadius: 10,
  padding: 22,
};

const h3 = { margin: '0 0 16px', font: `400 22px/1.2 ${SERIF}`, color: PALETTE.ink };

const LEADER_ICONS = { 'Vietnamese Eucharistic Youth Movement': Users, 'Lion Dancing': Award };

export default function AboutSection({ openLightbox }) {
  return (
    <div>
      <div className="tet-cols-about">
        {/* bio */}
        <div style={card}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 18 }}>
            <img
              src={asset('/Me.jpeg')}
              alt="An Nguyen"
              loading="lazy"
              style={{ width: 104, height: 104, objectFit: 'cover', objectPosition: 'center 15%', borderRadius: 8, border: '3px solid rgba(255,252,242,0.75)', boxShadow: '0 2px 8px rgba(46,36,22,0.25)', transform: 'rotate(-2deg)', flex: 'none' }}
            />
            <div>
              <h3 style={{ ...h3, marginBottom: 8 }}>A bit about myself</h3>
              <div style={{ font: `13px/1.6 ${MONO}`, color: PALETTE.engraved }}>{SOCIALS.location}</div>
            </div>
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 12 }}>
            {ABOUT_BULLETS.map((b) => (
              <li key={b.lead} style={{ font: `14px/1.65 ${MONO}`, color: PALETTE.inkSoft, paddingLeft: 18, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: PALETTE.seal }}>•</span>
                <strong style={{ color: PALETTE.ink }}>{b.lead}</strong>
                {b.rest}
              </li>
            ))}
          </ul>
        </div>

        {/* education */}
        <div style={{ display: 'grid', gap: 16 }}>
          {EDUCATION.map((e) => (
            <div key={e.degree} style={card}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                <GraduationCap size={22} color={PALETTE.seal} style={{ flex: 'none', marginTop: 2 }} />
                <div>
                  <div style={{ font: `500 17px/1.35 ${SERIF}`, color: PALETTE.ink }}>{e.degree}</div>
                  <div style={{ font: `13px/1.6 ${MONO}`, color: PALETTE.engraved }}>{e.school}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', font: `12px/1.5 ${MONO}`, color: PALETTE.inkSoft }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><MapPin size={13} /> {e.location}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Calendar size={13} /> {e.graduation}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Star size={13} color={PALETTE.seal} /> GPA {e.gpa}</span>
              </div>
              <div style={{ marginTop: 10, display: 'inline-block', font: `11px/1 ${MONO}`, color: PALETTE.engraved, border: `1px solid ${PALETTE.rule}`, borderRadius: 999, padding: '4px 12px' }}>
                {e.type}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* leadership & volunteering */}
      <h3 style={{ ...h3, margin: '36px 0 18px', fontSize: 26 }}>Leadership &amp; Volunteering</h3>
      <div style={{ display: 'grid', gap: 22 }}>
        {LEADERSHIP.map((l) => {
          const Icon = LEADER_ICONS[l.title] || Users;
          return (
            <div key={l.title} className="tet-cols-leader" style={card}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Icon size={20} color={PALETTE.seal} />
                  <div style={{ font: `500 18px/1.3 ${SERIF}`, color: PALETTE.ink }}>{l.title}</div>
                </div>
                <div style={{ font: `12px/1.6 ${MONO}`, color: PALETTE.engraved, marginBottom: 12 }}>
                  {l.role} · {l.period}
                </div>
                <p style={{ margin: 0, font: `13.5px/1.7 ${MONO}`, color: PALETTE.inkSoft }}>{l.description}</p>
              </div>
              <Carousel images={l.images} alt={l.title} height={300} onExpand={openLightbox} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
