import React from 'react';
import { Calendar, ExternalLink, Github } from 'lucide-react';
import {
  SiReact, SiTypescript, SiJavascript, SiNodedotjs, SiPostgresql, SiMongodb,
  SiExpress, SiHtml5, SiCss3, SiOpenai, SiAmazonaws, SiPrisma, SiPython,
} from 'react-icons/si';
import { MONO, PALETTE, SERIF, asset } from '../theme';
import { PROJECTS, SOCIALS } from '../../../content/portfolioData';

const TECH_ICONS = {
  React: SiReact, TypeScript: SiTypescript, JavaScript: SiJavascript, 'Node.js': SiNodedotjs,
  PostgreSQL: SiPostgresql, MongoDB: SiMongodb, Express: SiExpress, HTML5: SiHtml5,
  CSS3: SiCss3, 'OpenAI API': SiOpenai, AWS: SiAmazonaws, Prisma: SiPrisma, Python: SiPython,
};

const linkBtn = (primary) => ({
  display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', cursor: 'pointer',
  font: `500 12px/1 ${MONO}`, borderRadius: 6, padding: '9px 14px',
  background: primary ? PALETTE.seal : PALETTE.ink,
  color: PALETTE.linen, border: 'none',
});

export default function ProjectsSection() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 22 }}>
        {PROJECTS.map((p) => (
          <div key={p.title} style={{ background: PALETTE.cardBg, border: `1px solid ${PALETTE.rule}`, borderRadius: 10, padding: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ font: `500 19px/1.3 ${SERIF}`, color: PALETTE.ink }}>{p.title}</div>
              {p.featured && (
                <span style={{ font: `10px/1 ${MONO}`, letterSpacing: '0.1em', textTransform: 'uppercase', color: PALETTE.seal, border: `1px solid ${PALETTE.seal}`, borderRadius: 999, padding: '4px 10px', whiteSpace: 'nowrap' }}>
                  Featured
                </span>
              )}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: `12px/1 ${MONO}`, color: PALETTE.engraved }}>
              <Calendar size={13} /> {p.date}
            </div>

            {p.image && (
              <a href={p.imageLink || p.github} target="_blank" rel="noopener noreferrer" title="Open project" style={{ display: 'block', borderRadius: 8, overflow: 'hidden', border: `1px solid ${PALETTE.rule}` }}>
                <img src={asset(p.image)} alt={p.title} loading="lazy" decoding="async" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
              </a>
            )}

            <p style={{ margin: 0, font: `13px/1.7 ${MONO}`, color: PALETTE.inkSoft, flex: 1 }}>{p.description}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {p.tech.map((t) => {
                const Icon = TECH_ICONS[t];
                return (
                  <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: `11px/1 ${MONO}`, color: PALETTE.inkSoft, border: `1px solid ${PALETTE.rule}`, borderRadius: 999, padding: '5px 11px' }}>
                    {Icon && <Icon size={12} />}
                    {t}
                  </span>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <a href={p.github} target="_blank" rel="noopener noreferrer" style={linkBtn(false)}>
                <Github size={14} /> Code
              </a>
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" style={linkBtn(true)}>
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <div style={{ font: `14px/1.6 ${MONO}`, color: PALETTE.engraved, marginBottom: 12 }}>Want to see more of my work?</div>
        <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" style={linkBtn(true)}>
          <Github size={14} /> View All Projects on GitHub
        </a>
      </div>
    </div>
  );
}
