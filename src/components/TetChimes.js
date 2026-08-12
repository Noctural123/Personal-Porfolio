import React, { useEffect, useRef } from 'react';

// Tết chimes — original Verlet chain simulation.
// Each saying hangs as a wind-chime strand: one letter per tile, tiles
// chained vertically, swinging and knocking like chimes. Strands hang from
// a chin-shaped arc that will later be replaced by a lion dance head image
// (the strands become its beard), so anchors flow through anchorPoint().

const PHRASES = [
  'Múa Lân',
  'Sức Khỏe Dồi Dào',
  'Chúc Mừng Năm Mới',
  'Chúc Năm Mới Phát Tài',
  'Tiền Vô Như Nước',
  'Sống Lâu Trăm Tuổi',
  'Vạn Sự Như Ý',
];

const RED_DARK = '#7c1013';
const RED_MAIN = '#a8191f';
const GOLD = '#e9b64d';
const GOLD_TEXT = '#f7d98a';

export default function TetChimes() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = 1;
    let strands = [];
    let embers = [];
    let raf = 0;
    let time = 0;
    const mouse = { x: -9999, y: -9999, dx: 0, dy: 0 };
    let drag = null;

    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

    // Anchor along the "chin" arc: u in [-1, 1], dips down at the center.
    function anchorPoint(u) {
      const span = Math.min(width * 0.78, 980);
      const dip = clamp(height * 0.06, 30, 60);
      return {
        x: width / 2 + (u * span) / 2,
        y: clamp(height * 0.09, 50, 100) + dip * (1 - u * u),
      };
    }

    function buildStrands() {
      const seg = clamp(height * 0.034, 24, 36);
      const fontSize = seg * 0.52;
      const font = `700 ${fontSize}px 'Be Vietnam Pro', 'Segoe UI', sans-serif`;

      strands = PHRASES.map((phrase, r) => {
        // one cell per character; spaces become small gold beads
        const cells = phrase.split('');
        const u = PHRASES.length === 1 ? 0 : (r / (PHRASES.length - 1)) * 2 - 1;
        const anchor = anchorPoint(u);

        // point 0 = pinned anchor, 1 = top bead, 2.. = one per cell, last = tassel
        const count = cells.length + 3;
        const points = [];
        for (let i = 0; i < count; i++) {
          const x = anchor.x + (Math.random() - 0.5) * 4;
          const y = anchor.y + i * seg;
          // rx/ry: resting position this point springs back toward, like the
          // reference chimes snapping home instead of drifting/oscillating
          points.push({ x, y, px: x, py: y, rx: anchor.x, ry: y });
        }
        const tile = seg * 0.82;
        return { phrase, cells, points, seg, tile, anchor, u, font, fontSize, phase: r * 1.7 };
      });
    }

    function buildEmbers() {
      embers = Array.from({ length: 42 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 1.7,
        vy: 0.1 + Math.random() * 0.3,
        tw: Math.random() * Math.PI * 2,
      }));
    }

    function resize() {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStrands();
      buildEmbers();
    }

    function update() {
      const gravity = 0.45;
      const damping = 0.85; // heavier velocity damping so swings settle instead of lingering
      const maxSpeed = 3.2; // clamp per-frame velocity so disturbances can't build into big swings
      for (const s of strands) {
        const wind =
          Math.sin(time * 0.0006 + s.phase) * 0.012 +
          Math.sin(time * 0.0017 + s.phase * 2.3) * 0.006;

        for (let i = 1; i < s.points.length; i++) {
          const p = s.points[i];
          let vx = (p.x - p.px) * damping;
          let vy = (p.y - p.py) * damping;
          const speed = Math.hypot(vx, vy);
          if (speed > maxSpeed) {
            const k = maxSpeed / speed;
            vx *= k;
            vy *= k;
          }
          p.px = p.x;
          p.py = p.y;
          p.x += vx + wind * (i / s.points.length) * 1.5;
          p.y += vy + gravity;

          // pointer knocks the chimes
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const md = Math.hypot(mdx, mdy);
          if (md < 55) {
            const fall = 1 - md / 55;
            p.x += clamp(mouse.dx, -22, 22) * 0.1 * fall;
            p.y += clamp(mouse.dy, -22, 22) * 0.045 * fall;
          }

          // spring back toward the resting hang line, like the reference chimes
          // snapping home instead of drifting or riding out long oscillations
          p.x += (p.rx - p.x) * 0.03;
          p.y += (p.ry - p.y) * 0.012;
        }

        for (let iter = 0; iter < 10; iter++) {
          s.points[0].x = s.anchor.x;
          s.points[0].y = s.anchor.y;
          if (drag && drag.strand === s) {
            drag.point.x = mouse.x;
            drag.point.y = mouse.y;
          }
          constrain(s, 1, 1);
          constrain(s, 2, 0.5); // more stiffness so strands hang like rods, not spaghetti
        }
      }
      mouse.dx *= 0.5;
      mouse.dy *= 0.5;
    }

    function constrain(s, gap, strength) {
      const rest = s.seg * gap;
      for (let i = 0; i < s.points.length - gap; i++) {
        const a = s.points[i];
        const b = s.points[i + gap];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.0001;
        const diff = ((dist - rest) / dist) * 0.5 * strength;
        if (i !== 0) {
          a.x += dx * diff;
          a.y += dy * diff;
          b.x -= dx * diff;
          b.y -= dy * diff;
        } else {
          b.x -= dx * diff * 2;
          b.y -= dy * diff * 2;
        }
      }
    }

    function segmentAngle(s, i) {
      const a = s.points[Math.max(0, i - 1)];
      const b = s.points[Math.min(s.points.length - 1, i + 1)];
      return Math.atan2(b.y - a.y, b.x - a.x);
    }

    function drawBackground() {
      const g = ctx.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, '#170a0b');
      g.addColorStop(1, '#2b1113');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // warm glow where the lion head will live
      const head = anchorPoint(0);
      const glow = ctx.createRadialGradient(head.x, head.y - 40, 10, head.x, head.y - 40, width * 0.45);
      glow.addColorStop(0, 'rgba(255, 158, 64, 0.14)');
      glow.addColorStop(1, 'rgba(255, 158, 64, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // placeholder chin arc — swapped for the lion head image later
      ctx.beginPath();
      for (let i = 0; i <= 40; i++) {
        const p = anchorPoint((i / 40) * 2 - 1);
        i === 0 ? ctx.moveTo(p.x, p.y - 14) : ctx.lineTo(p.x, p.y - 14);
      }
      ctx.strokeStyle = 'rgba(233, 182, 77, 0.28)';
      ctx.setLineDash([2, 7]);
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function drawEmbers() {
      for (const e of embers) {
        e.y -= e.vy;
        e.tw += 0.03;
        if (e.y < -6) {
          e.y = height + 6;
          e.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(246, 205, 120, ${0.12 + 0.12 * Math.sin(e.tw)})`;
        ctx.fill();
      }
    }

    function roundedRect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function drawStrand(s) {
      const pts = s.points;

      // the string itself, threaded through every tile
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.strokeStyle = 'rgba(233, 182, 77, 0.5)';
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // anchor ring + top bead
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, 3, 0, Math.PI * 2);
      ctx.strokeStyle = GOLD;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(pts[1].x, pts[1].y, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = GOLD;
      ctx.fill();

      // letter tiles
      ctx.font = s.font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let c = 0; c < s.cells.length; c++) {
        const ch = s.cells[c];
        const i = c + 2;
        const p = pts[i];
        const ang = segmentAngle(s, i);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(ang - Math.PI / 2);

        if (ch === ' ') {
          // word gap — small gold bead like a chime spacer
          ctx.beginPath();
          ctx.arc(0, 0, 3.2, 0, Math.PI * 2);
          ctx.fillStyle = GOLD;
          ctx.fill();
        } else {
          const t = s.tile;
          const grad = ctx.createLinearGradient(0, -t / 2, 0, t / 2);
          grad.addColorStop(0, RED_MAIN);
          grad.addColorStop(1, RED_DARK);
          ctx.shadowColor = 'rgba(0,0,0,0.4)';
          ctx.shadowBlur = 8;
          ctx.shadowOffsetY = 3;
          roundedRect(-t / 2, -t / 2, t, t, 4);
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetY = 0;
          ctx.strokeStyle = 'rgba(233, 182, 77, 0.8)';
          ctx.lineWidth = 1.1;
          ctx.stroke();
          ctx.fillStyle = 'rgba(0,0,0,0.35)';
          ctx.fillText(ch, 1, 2);
          ctx.fillStyle = GOLD_TEXT;
          ctx.fillText(ch, 0, 0);
        }
        ctx.restore();
      }

      // tassel at the tip
      const tip = pts[pts.length - 1];
      const tAng = segmentAngle(s, pts.length - 1);
      ctx.save();
      ctx.translate(tip.x, tip.y);
      ctx.rotate(tAng - Math.PI / 2);
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 1.1;
      for (let t = -3; t <= 3; t++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(t * 2.2, 9, t * 3.2, 18 + (3 - Math.abs(t)) * 3);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = GOLD;
      ctx.fill();
      ctx.restore();
    }

    function frame(now) {
      time = now;
      update();
      drawBackground();
      drawEmbers();
      for (const s of strands) drawStrand(s);
      raf = requestAnimationFrame(frame);
    }

    function onPointerMove(e) {
      mouse.dx = e.clientX - (mouse.x === -9999 ? e.clientX : mouse.x);
      mouse.dy = e.clientY - (mouse.y === -9999 ? e.clientY : mouse.y);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function onPointerDown(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      let best = null;
      for (const s of strands) {
        for (let i = 1; i < s.points.length; i++) {
          const p = s.points[i];
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (d < 44 && (!best || d < best.d)) best = { strand: s, point: p, d };
        }
      }
      drag = best;
    }

    function onPointerUp() {
      drag = null;
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => buildStrands());
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        position: 'fixed',
        inset: 0,
        cursor: 'grab',
        touchAction: 'none',
      }}
    />
  );
}
