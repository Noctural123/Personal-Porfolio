import React, { useEffect, useRef } from 'react';

// Nav light bulbs hanging from the roof on strings. Each string is a small
// Verlet chain (same physics family as the beard): it sways in the wind,
// parts around the cursor, and the bulb can be grabbed and swung. A clean
// click (no drag) follows the link.

const LIGHTS = [
  { label: 'About', href: '#about', x: 0.12, len: 210 },
  { label: 'Hobbies', href: '#personal', x: 0.23, len: 320 },
  { label: 'Projects', href: '#projects', x: 0.77, len: 320 },
  { label: 'Internships', href: '#experience', x: 0.88, len: 210 },
];
const SEGS = 8;
const GRAVITY = 0.2;
const DAMPING = 0.99;
const SOLVE_ITERS = 4;
const MOUSE_SIZE = 5000;
const MOUSE_STRENGTH = 4;

const MONO = "'IBM Plex Mono', ui-monospace, Menlo, monospace";

export default function HangingLights() {
  const rootRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const polys = Array.from(svgRef.current.querySelectorAll('polyline'));
    const bulbs = Array.from(root.querySelectorAll('a[data-bulb]'));
    const chains = [];
    let raf = 0;
    let lastT = 0;
    let time = 0;
    const mouse = { x: -9999, y: -9999, moved: false };
    const drag = { chain: -1, moved: 0 };

    const smoothstep = (e0, e1, x) => {
      const d = e1 - e0;
      if (Math.abs(d) < 1e-6) return 0;
      let t = (x - e0) / d;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      return t * t * (3 - 2 * t);
    };

    const build = () => {
      const width = root.clientWidth;
      chains.length = 0;
      LIGHTS.forEach((l, li) => {
        const ax = l.x * width;
        const seg = l.len / (SEGS - 1);
        const pts = [];
        for (let i = 0; i < SEGS; i++) pts.push({ x: ax, y: i * seg, px: ax, py: i * seg });
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

    const local = (e) => {
      const r = root.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const step = (dd) => {
      for (let ci = 0; ci < chains.length; ci++) {
        const c = chains[ci];
        const wind = Math.sin(time * 0.0007 + c.phase) * 0.01 + Math.sin(time * 0.0019 + c.phase * 2.1) * 0.005;
        for (let i = 1; i < SEGS; i++) {
          const p = c.pts[i];
          const vx = (p.x - p.px) * DAMPING, vy = (p.y - p.py) * DAMPING;
          p.px = p.x; p.py = p.y;
          // the bulb at the tip is heavier than the string
          p.x += vx + wind * (i / SEGS) * 2;
          p.y += vy + GRAVITY * (i === SEGS - 1 ? 1.6 : 1);
        }
        // cursor field, same shape as the beard's
        if (mouse.moved && drag.chain !== ci) {
          for (let i = 1; i < SEGS; i++) {
            const p = c.pts[i];
            const dx = p.x - mouse.x, dy = p.y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 >= MOUSE_SIZE) continue;
            const d = Math.sqrt(d2) || 1e-4;
            const k = (smoothstep(MOUSE_SIZE, -2000, d2) * MOUSE_STRENGTH / 300) * dd;
            p.x += (dx / d) * k;
            p.y += (dy / d) * k;
          }
        }
        if (drag.chain === ci) {
          const tip = c.pts[SEGS - 1];
          tip.x = mouse.x; tip.y = mouse.y; tip.px = mouse.x; tip.py = mouse.y;
        }
        for (let n = 0; n < SOLVE_ITERS; n++) solve(c);
        if (drag.chain === ci) {
          const tip = c.pts[SEGS - 1];
          tip.x = mouse.x; tip.y = mouse.y; tip.px = mouse.x; tip.py = mouse.y;
        }
      }
      mouse.moved = false;
    };

    const render = () => {
      for (let ci = 0; ci < chains.length; ci++) {
        const c = chains[ci];
        polys[ci].setAttribute('points', c.pts.map((p) => `${p.x},${p.y}`).join(' '));
        const tip = c.pts[SEGS - 1], prev = c.pts[SEGS - 2];
        const ang = Math.atan2(tip.y - prev.y, tip.x - prev.x) - Math.PI / 2;
        bulbs[ci].style.transform = `translate(-50%, 0) translate(${tip.x}px, ${tip.y}px) rotate(${ang}rad)`;
      }
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(32, Math.max(1, now - (lastT || now - 16)));
      lastT = now;
      time = now;
      step(dt * dt);
      render();
    };

    const onMove = (e) => {
      const pt = local(e);
      mouse.x = pt.x; mouse.y = pt.y; mouse.moved = true;
      if (drag.chain >= 0) drag.moved += Math.abs(e.movementX || 0) + Math.abs(e.movementY || 0);
    };
    const onUp = () => { drag.chain = -1; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    bulbs.forEach((a, i) => {
      a.addEventListener('pointerdown', (e) => {
        const pt = local(e);
        mouse.x = pt.x; mouse.y = pt.y;
        drag.chain = i; drag.moved = 0;
      });
      // a real drag shouldn't navigate when the pointer is released on the bulb
      a.addEventListener('click', (e) => { if (drag.moved > 8) e.preventDefault(); });
    });

    build();
    const ro = new ResizeObserver(build);
    ro.observe(root);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <div ref={rootRef} style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none', overflow: 'visible' }}>
      <svg ref={svgRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {LIGHTS.map((l) => (
          <polyline key={l.label} fill="none" stroke="rgba(74, 58, 44, 0.75)" strokeWidth="1.4" />
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
          {/* brass socket */}
          <span style={{ width: 10, height: 9, background: 'linear-gradient(#8a734f, #6b5744)', borderRadius: '2px 2px 1px 1px', display: 'block' }} />
          {/* glowing bulb */}
          <span style={{
            width: 26, height: 30, display: 'block', marginTop: -1,
            borderRadius: '50% 50% 48% 48% / 42% 42% 58% 58%',
            background: 'radial-gradient(circle at 42% 32%, #fff8e0, #f5d98d 52%, #dcae55 88%)',
            boxShadow: '0 0 16px 5px rgba(246, 205, 120, 0.55), 0 0 42px 14px rgba(246, 205, 120, 0.22)',
          }} />
          <span style={{ marginTop: 10, font: `13px/1 ${MONO}`, letterSpacing: '0.05em', color: '#4A3A2C', textShadow: '0 1px 2px rgba(224, 211, 188, 0.9)' }}>
            {l.label}
          </span>
        </a>
      ))}
    </div>
  );
}
