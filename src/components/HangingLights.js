import React, { useEffect, useRef } from 'react';

// Nav light bulbs hanging from the roof on strings. Each string is a small
// Verlet chain that hangs plumb with a barely-perceptible ambient drift.
// The ONLY mouse interaction: pressing a bulb switches its light on/off
// (and the link navigates). The cursor never disturbs the strings.

const LIGHTS = [
  { label: 'About', href: '#about', x: 0.12, len: 210 },
  { label: 'Hobbies', href: '#personal', x: 0.23, len: 320 },
  { label: 'Projects', href: '#projects', x: 0.77, len: 320 },
  { label: 'Internships', href: '#experience', x: 0.88, len: 210 },
];
const SEGS = 10;
const GRAVITY = 0.2;
const DAMPING = 0.99;
const SOLVE_ITERS = 4;

const MONO = "'IBM Plex Mono', ui-monospace, Menlo, monospace";

export default function HangingLights() {
  const rootRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const paths = Array.from(svgRef.current.querySelectorAll('path'));
    const bulbs = Array.from(root.querySelectorAll('a[data-bulb]'));
    const chains = [];
    let raf = 0;
    let time = 0;

    const build = () => {
      const width = root.clientWidth;
      chains.length = 0;
      LIGHTS.forEach((l, li) => {
        const ax = l.x * width;
        const seg = l.len / (SEGS - 1);
        const pts = [];
        for (let i = 0; i < SEGS; i++) {
          pts.push({ x: ax, y: i * seg, px: ax, py: i * seg });
        }
        chains.push({ pts, seg, phase: li * 1.9 });
      });
    };

    const solve = (c) => {
      c.pts[0].px = c.pts[0].x; c.pts[0].py = c.pts[0].y;
      for (let i = 0; i < SEGS - 1; i++) {
        const a = c.pts[i], b = c.pts[i + 1];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 1e-4;
        const diff = ((d - c.seg) / d) * 0.5;
        if (i === 0) {
          b.x -= dx * diff * 2; b.y -= dy * diff * 2;
        } else {
          a.x += dx * diff; a.y += dy * diff;
          b.x -= dx * diff; b.y -= dy * diff;
        }
      }
    };

    const step = () => {
      for (let ci = 0; ci < chains.length; ci++) {
        const c = chains[ci];
        // barely-there ambient drift: the bulb wanders only a couple of
        // pixels off plumb, like still indoor air
        const wind = Math.sin(time * 0.00045 + c.phase) * 0.0025 + Math.sin(time * 0.0013 + c.phase * 2.1) * 0.001;
        for (let i = 1; i < SEGS; i++) {
          const p = c.pts[i];
          const vx = (p.x - p.px) * DAMPING, vy = (p.y - p.py) * DAMPING;
          p.px = p.x; p.py = p.y;
          // the bulb at the tip is heavier than the string
          p.x += vx + wind * (i / SEGS) * 2;
          p.y += vy + GRAVITY * (i === SEGS - 1 ? 1.6 : 1);
        }
        for (let n = 0; n < SOLVE_ITERS; n++) solve(c);
      }
    };

    // catmull-rom -> bezier through the chain points: hangs straight at
    // rest, bends smoothly (no kinks) when swung or dragged
    const stringPath = (c) => {
      const pts = c.pts;
      let s = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
        const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
        const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
        s += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
      }
      return s;
    };

    const render = () => {
      for (let ci = 0; ci < chains.length; ci++) {
        const c = chains[ci];
        paths[ci].setAttribute('d', stringPath(c));
        const tip = c.pts[SEGS - 1], prev = c.pts[SEGS - 2];
        const ang = Math.atan2(tip.y - prev.y, tip.x - prev.x) - Math.PI / 2;
        bulbs[ci].style.transform = `translate(-50%, 0) translate(${tip.x}px, ${tip.y}px) rotate(${ang}rad)`;
      }
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      time = now;
      step();
      render();
    };

    // the ONLY mouse interaction: pressing a bulb flips its light. Keep
    // handler references so cleanup can remove them — StrictMode double-
    // mounts the effect, and a duplicated listener would toggle twice.
    const bulbHandlers = bulbs.map((a) => {
      const down = () => {
        // set opacity directly so no stylesheet cascade can interfere
        const lit = a.classList.toggle('lit');
        a.querySelector('.hl-on').style.opacity = lit ? '1' : '0';
      };
      a.addEventListener('pointerdown', down);
      return { a, down };
    });

    build();
    const ro = new ResizeObserver(build);
    ro.observe(root);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      bulbHandlers.forEach(({ a, down }) => a.removeEventListener('pointerdown', down));
    };
  }, []);

  return (
    <div ref={rootRef} style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none', overflow: 'visible' }}>
      <svg ref={svgRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {LIGHTS.map((l) => (
          <path key={l.label} fill="none" stroke="rgba(74, 58, 44, 0.75)" strokeWidth="1.4" strokeLinecap="round" />
        ))}
      </svg>
      {LIGHTS.map((l) => (
        <a
          key={l.label}
          data-bulb
          href={l.href}
          draggable={false}
          style={{
            position: 'absolute', left: 0, top: 0, transformOrigin: 'top center',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            pointerEvents: 'auto', textDecoration: 'none', cursor: 'pointer', willChange: 'transform',
          }}
        >
          {/* Edison bulb sprite: dark at rest, lit on hover */}
          <span style={{ position: 'relative', width: 38, height: 63, display: 'block' }}>
            <img
              src={`${process.env.PUBLIC_URL}/bulb_off.png`} alt="" draggable={false}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <img
              src={`${process.env.PUBLIC_URL}/bulb_on.png`} alt="" draggable={false} className="hl-on"
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain',
                opacity: 0, transition: 'opacity 220ms ease',
                filter: 'drop-shadow(0 0 10px rgba(246, 205, 120, 0.75)) drop-shadow(0 0 26px rgba(246, 205, 120, 0.35))',
              }}
            />
          </span>
          <span style={{ marginTop: 10, font: `13px/1 ${MONO}`, letterSpacing: '0.05em', color: '#4A3A2C', textShadow: '0 1px 2px rgba(224, 211, 188, 0.9)' }}>
            {l.label}
          </span>
        </a>
      ))}
    </div>
  );
}
