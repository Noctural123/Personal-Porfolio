import React, { useEffect, useRef, useState } from 'react';
import './TetHero.css';

// Tết lion-dance hero, ported from the "Hero 1b" Claude Design comp.
// The beard is a Verlet cloth of text glyphs hanging under the lion head;
// hovering/dragging it rings wind-chime tones synthesized with WebAudio.

const CONTENT =
  'chúc mừng năm mới, vạn sự như ý, tiền vô như nước, sức khỏe dồi dào, sống lâu trăm tuổi, phát tài, múa lân';
const COLOR = '#0b0a08';
// physics ported from the original chimes (marinabudarina.github.io/chimes):
// low friction + slack spacer links between strands is what makes them part
// and fall back together fluidly instead of swinging alone or moving as a sheet
const GRAVITY = 0.2;
const DAMPING = 0.99;
const SOLVE_ITERS = 5;
const MOUSE_SIZE = 5000; // squared px — cursor field reach (~71px radius)
const MOUSE_STRENGTH = 4; // strength of the radial push away from the cursor
const GRAB_RADIUS = 70; // px — click grabs every strand point within this reach of the cursor
const VOLUME = 0.5;
const FONT_SIZE = 11;
const LETTER_SPACING = 1;
const LINE_HEIGHT = 1;

const MONO = "'IBM Plex Mono', ui-monospace, Menlo, monospace";
const SERIF = "'STIX Two Text', Georgia, serif";

export default function TetHero() {
  const canvasRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const ensureAudioRef = useRef(() => false);
  const [lionImgOk, setLionImgOk] = useState(true);

  useEffect(() => {
    playingRef.current = playing;
    ensureAudioRef.current(false);
  }, [playing]);

  useEffect(() => {
    // canvas bleed around the beard box — big enough that strands dragged or
    // flung anywhere in the hero never hit the canvas edge and get cut off
    const BLEED = 700;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const smoothstep = (e0, e1, x) => {
      const d = e1 - e0;
      if (Math.abs(d) < 1e-6) return 0;
      let t = (x - e0) / d;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      return t * t * (3 - 2 * t);
    };
    const phys = { particles: [], constraints: [], cols: 0, rows: 0, width: 0, height: 0 };
    const pointer = { active: false, down: false, moved: false, x: 0, y: 0, dx: 0, dy: 0, grabbed: [], pointerId: -1 };

    const atlas = new Map();
    let advance = 8, glyphH = 14, glyphW = 12, glyphHL = 14, baseline = 9, leftPad = 1;
    let atlasBuilt = false;
    const FONT = (px) => `700 ${px}px 'Courier New', Courier, monospace`;
    const buildAtlas = () => {
      if (atlasBuilt) return;
      atlasBuilt = true;
      atlas.clear();
      const fontPx = Math.floor(FONT_SIZE);
      const m = document.createElement('canvas').getContext('2d');
      m.font = FONT(fontPx);
      let maxAdv = fontPx * 0.6, maxL = 0, maxR = fontPx * 0.6, maxAsc = fontPx * 0.8, maxDesc = fontPx * 0.2;
      const uniq = new Set(CONTENT.split(''));
      uniq.forEach((ch) => {
        const mt = m.measureText(ch);
        maxAdv = Math.max(maxAdv, mt.width || 0);
        maxL = Math.max(maxL, mt.actualBoundingBoxLeft || 0);
        maxR = Math.max(maxR, mt.actualBoundingBoxRight || 0);
        maxAsc = Math.max(maxAsc, mt.actualBoundingBoxAscent || fontPx * 0.8);
        maxDesc = Math.max(maxDesc, mt.actualBoundingBoxDescent || fontPx * 0.2);
      });
      const ink = Math.max(maxAdv, maxL + maxR);
      glyphW = Math.max(6, Math.ceil(ink + 2));
      glyphHL = Math.max(8, Math.ceil(maxAsc + maxDesc + 2));
      advance = Math.max(2, ink - 0.5);
      glyphH = maxAsc + maxDesc;
      leftPad = 1 + maxL;
      baseline = Math.floor(maxAsc + 1);
      uniq.forEach((ch) => {
        const off = document.createElement('canvas');
        off.width = Math.max(1, Math.floor(glyphW * dpr));
        off.height = Math.max(1, Math.floor(glyphHL * dpr));
        const o = off.getContext('2d');
        o.setTransform(dpr, 0, 0, dpr, 0, 0);
        o.fillStyle = COLOR;
        o.font = FONT(fontPx);
        o.textAlign = 'left';
        o.textBaseline = 'alphabetic';
        o.fillText(ch, leftPad, baseline);
        atlas.set(ch, off);
      });
    };
    const solve = (constraints, particles) => {
      for (const l of constraints) {
        const a = particles[l.a], b = particles[l.b];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1e-4;
        let corr = 0;
        if (dist < l.min) corr = (l.min - dist) / dist;
        else if (dist > l.max) corr = (l.max - dist) / dist;
        else continue;
        const ox = dx * 0.5 * corr, oy = dy * 0.5 * corr;
        if (!a.pinned) { a.x -= ox; a.y -= oy; }
        if (!b.pinned) { b.x += ox; b.y += oy; }
      }
    };
    const build = () => {
      const host = canvas.parentElement;
      const width = host.clientWidth, height = host.clientHeight;
      if (!width || !height) return;
      buildAtlas();
      canvas.width = Math.floor((width + BLEED * 2) * dpr);
      canvas.height = Math.floor((height + BLEED * 2) * dpr);
      const tX = Math.max(1, advance * LETTER_SPACING);
      const tY = Math.max(1, glyphH * LINE_HEIGHT);
      const cols = Math.max(8, Math.min(180, Math.round(width / tX) + 1));
      let rows = Math.max(8, Math.min(180, Math.round(height / tY) + 1));
      rows = Math.max(8, Math.min(rows, Math.max(8, Math.floor(9000 / cols))));
      const sX = cols > 1 ? width / (cols - 1) : width;
      const sY = rows > 1 ? height / (rows - 1) : height;
      const particles = [], constraints = [];
      const cs = (CONTENT.replace(/[,;·|]+/g, ' ').replace(/\s+/g, ' ').trim() + ' ') || 'múa lân ';
      const seeded = (i) => { const v = Math.sin(i * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
      const colLen = [];
      for (let x = 0; x < cols; x++) {
        // each column is an independent hanging strand (like a beard lock),
        // ending well above the fold with a ragged edge so the bottoms
        // visibly dangle in the air instead of running off the page
        const shape = 0.78;
        const jag = (seeded(x) - 0.5) * 0.2 + (seeded(x * 3 + 7) - 0.5) * 0.1;
        colLen.push(Math.max(5, Math.round(rows * Math.max(0.55, Math.min(0.95, shape + jag)))));
      }
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const idx = y * cols + x;
        const px = BLEED + x * sX, py = BLEED + y * sY;
        const dead = y >= colLen[x];
        particles.push({ x: px, y: py, px, py, pinned: y === 0 || dead, basePinned: y === 0, dead, char: cs[(x * rows + y) % cs.length] });
        if (!dead) {
          // strand chain: very loose compression so links fold past each other
          if (y > 0) constraints.push({ a: idx - cols, b: idx, min: sY * 0.02, max: sY * 1.1 });
          // slack spacer between neighbors: engages only when strands crowd
          // (< 0.6x) or tear apart (> 4x), so they fall together fluidly
          // without acting like a woven sheet
          if (x > 0 && y < colLen[x - 1]) constraints.push({ a: idx - 1, b: idx, min: sX * 0.6, max: sX * 4 });
        }
      }
      const steps = particles.length > 2600 ? 60 : particles.length > 1400 ? 72 : 90;
      for (let s = 0; s < steps; s++) {
        for (const p of particles) {
          if (p.pinned) continue;
          const vx = (p.x - p.px) * DAMPING, vy = (p.y - p.py) * DAMPING;
          p.px = p.x; p.py = p.y;
          p.x += vx; p.y += vy + GRAVITY;
        }
        for (let n = 0; n < SOLVE_ITERS; n++) solve(constraints, particles);
      }
      for (const p of particles) { p.px = p.x; p.py = p.y; }
      phys.particles = particles; phys.constraints = constraints;
      phys.cols = cols; phys.rows = rows;
      phys.sX = sX; phys.sY = sY;
      phys.width = width + BLEED * 2; phys.height = height + BLEED * 2;
    };

    const audio = { ctx: null, master: null, lastStrike: 0 };
    const presets = [
      { decay: 1.35, br: 0.42, r: [1, 2.31, 3.76, 5.1] }, { decay: 0.72, br: 0.9, r: [1, 2.44, 3.91, 5.82, 7.3] },
      { decay: 0.98, br: 0.56, r: [1, 2.28, 3.72, 5.03] }, { decay: 0.78, br: 0.62, r: [1, 2.35, 3.84, 5.26] },
      { decay: 1.25, br: 0.47, r: [1, 2.29, 3.63, 4.97] }, { decay: 0.66, br: 0.94, r: [1, 2.5, 3.98, 5.95, 8.1] },
      { decay: 1.16, br: 0.5, r: [1, 2.27, 3.7, 5.08] }, { decay: 1.02, br: 0.58, r: [1, 2.33, 3.74, 5.18] },
      { decay: 0.61, br: 0.97, r: [1, 2.61, 4.09, 6.2, 8.6] }, { decay: 1.08, br: 0.6, r: [1, 2.32, 3.79, 5.22] },
      { decay: 0.82, br: 0.78, r: [1, 2.42, 3.9, 5.44, 7.2] }, { decay: 0.94, br: 0.66, r: [1, 2.34, 3.83, 5.25] },
      { decay: 1.4, br: 0.4, r: [1, 2.24, 3.55, 4.88] }];
    const pitchScale = [220, 247, 294, 330, 392, 440, 494, 588, 660];
    const armed = {}, strandCool = {};
    let lastHover = -1, disturbedIdx = -1, disturbedDist = Infinity;
    const lastPos = { x: 0, y: 0, has: false }, lastStrikePos = { x: 0, y: 0, has: false };
    const ensureAudio = (create) => {
      if (VOLUME <= 0) return false;
      if (!audio.ctx && create) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return false;
        const c = new AC();
        const lim = c.createDynamicsCompressor();
        lim.threshold.value = -20; lim.knee.value = 24; lim.ratio.value = 2.8; lim.attack.value = 0.005; lim.release.value = 0.24;
        const master = c.createGain();
        master.gain.value = VOLUME * 0.28;
        master.connect(lim); lim.connect(c.destination);
        audio.ctx = c; audio.master = master;
        if (!playingRef.current) { playingRef.current = true; setPlaying(true); }
      }
      if (!audio.ctx) return false;
      if (audio.ctx.state === 'suspended') audio.ctx.resume().catch(() => {});
      audio.master.gain.setTargetAtTime(playingRef.current ? VOLUME * 0.28 : 0, audio.ctx.currentTime, 0.02);
      return audio.ctx.state !== 'closed' && playingRef.current;
    };
    ensureAudioRef.current = ensureAudio;
    const strike = (disturbance, forced, idx, proxDist) => {
      if (!ensureAudio(false)) return;
      const c = audio.ctx, master = audio.master;
      const now = performance.now();
      const minInt = forced ? 53 : 68;
      if (!forced && idx >= 0 && armed[idx] === false) return;
      if (!forced) {
        if (disturbance < 45e-5) return;
        if (now - audio.lastStrike < minInt) return;
        if (lastPos.has && lastStrikePos.has) {
          if (Math.hypot(lastPos.x - lastStrikePos.x, lastPos.y - lastStrikePos.y) < 1.6) return;
        }
      } else if (now - audio.lastStrike < 40) return;
      if (idx >= 0) {
        if (now - (strandCool[idx] || 0) < 70) return;
        strandCool[idx] = now;
      }
      audio.lastStrike = now;
      if (!forced && idx >= 0) armed[idx] = false;
      lastStrikePos.x = lastPos.x; lastStrikePos.y = lastPos.y; lastStrikePos.has = lastPos.has;
      const intensity = forced ? 0.85 : 0.2 + (1 - Math.max(0, Math.min(1, proxDist / 55))) * 0.7;
      const t0 = c.currentTime + 0.001;
      const detune = 1 + (Math.random() * 0.02 - 0.01);
      let si = Math.floor(pitchScale.length * 0.5);
      if (idx >= 0) {
        const cols = Math.max(1, phys.cols);
        const t = cols > 1 ? (idx % cols) / (cols - 1) : 0.5;
        si = Math.max(0, Math.min(pitchScale.length - 1, Math.round(t * (pitchScale.length - 1))));
      }
      const base = pitchScale[si];
      const gainScale = (0.25 + intensity * 0.45) * (0.9 + Math.random() * 0.2);
      const panner = typeof StereoPannerNode !== 'undefined' ? new StereoPannerNode(c, { pan: Math.random() * 0.3 - 0.15 }) : null;
      const vg = c.createGain(); vg.gain.setValueAtTime(0.9, t0);
      const tf = c.createBiquadFilter(); tf.type = 'lowpass'; tf.Q.value = 0.35;
      vg.connect(tf); tf.connect(panner || master); if (panner) panner.connect(master);
      const preset = presets[Math.floor(Math.random() * presets.length)];
      const decay = Math.max(0.6, Math.min(1.4, preset.decay));
      tf.frequency.value = 2800 + preset.br * 800;
      const attack = 0.004 + Math.random() * 0.006;
      const n = Math.min(6, Math.max(3, preset.r.length));
      for (let i = 0; i < n; i++) {
        const osc = c.createOscillator(); osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        const pg = c.createGain();
        const tilt = 1 - (i / n) * (0.55 - preset.br * 0.25);
        const amp = (0.16 / (i + 1.1)) * tilt * gainScale;
        const pd = decay * (1 - i * 0.12);
        osc.frequency.setValueAtTime(base * 0.9 * preset.r[i] * detune * (1 + (Math.random() * 0.012 - 0.006)), t0);
        pg.gain.setValueAtTime(1e-5, t0);
        pg.gain.linearRampToValueAtTime(amp, t0 + attack);
        pg.gain.exponentialRampToValueAtTime(1e-5, t0 + Math.max(0.24, pd));
        osc.connect(pg); pg.connect(vg);
        osc.start(t0); osc.stop(t0 + Math.max(0.3, pd + 0.06));
      }
    };

    const pointerField = (x, y) => {
      const size = 8e3, str = MOUSE_STRENGTH;
      let maxS = 0, maxI = -1, maxD2 = Infinity;
      const ps = phys.particles;
      for (let i = 0; i < ps.length; i++) {
        if (ps[i].dead) continue;
        const dx = x - ps[i].x, dy = y - ps[i].y;
        const d2 = dx * dx + dy * dy;
        if (d2 >= size) continue;
        const s = smoothstep(size, -2e3, d2) * (str / 300);
        if (s > maxS) { maxS = s; maxI = i; maxD2 = d2; }
      }
      disturbedIdx = maxI; disturbedDist = Math.sqrt(maxD2);
      return maxS;
    };
    const applyPointer = (x, y, dd) => {
      // the original chimes' interaction: a smooth radial field that pushes
      // letters away from the cursor, scaled by the frame's real dt² exactly
      // like the original's force integration — so the push strength is the
      // same at 60Hz and 144Hz, and constraints absorb it in the same frame
      for (const p of phys.particles) {
        if (p.pinned) continue;
        const dx = p.x - x, dy = p.y - y;
        const d2 = dx * dx + dy * dy;
        if (d2 >= MOUSE_SIZE) continue;
        const d = Math.sqrt(d2) || 1e-4;
        const k = (smoothstep(MOUSE_SIZE, -2000, d2) * MOUSE_STRENGTH / 300) * dd;
        p.x += (dx / d) * k;
        p.y += (dy / d) * k;
      }
    };
    const local = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const nearest = (x, y) => {
      let best = -1, bd = 2500; // ~50px pickup radius so grabbing a string is easy
      const ps = phys.particles;
      for (let i = 0; i < ps.length; i++) {
        if (ps[i].dead) continue;
        const dx = ps[i].x - x, dy = ps[i].y - y, d2 = dx * dx + dy * dy;
        if (d2 < bd) { bd = d2; best = i; }
      }
      return best;
    };
    const onDown = (e) => {
      // click closes a fist around the beard: every strand point within
      // GRAB_RADIUS is caught and carried with the cursor, keeping its
      // offset so the handful holds its shape; everything else hangs free
      const pt = local(e);
      pointer.x = pt.x; pointer.y = pt.y; pointer.pointerId = e.pointerId;
      pointer.down = true;
      const r2 = GRAB_RADIUS * GRAB_RADIUS;
      const grabbed = [];
      const ps = phys.particles;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        if (p.pinned || p.dead) continue; // never grab anchors
        const dx = p.x - pt.x, dy = p.y - pt.y;
        if (dx * dx + dy * dy > r2) continue;
        p.pinned = true;
        grabbed.push({ p, ox: dx, oy: dy });
      }
      pointer.grabbed = grabbed;
      // a bare click plucks: an outward burst around the cursor so the
      // chimes visibly ring on click even without dragging (grabbed points
      // are pinned, so only the surrounding strands take the kick)
      for (const p of ps) {
        if (p.pinned) continue;
        const dx = p.x - pt.x, dy = p.y - pt.y;
        const d2 = dx * dx + dy * dy;
        if (d2 >= MOUSE_SIZE) continue;
        const d = Math.sqrt(d2) || 1e-4;
        const k = smoothstep(MOUSE_SIZE, -2000, d2) * 5;
        p.x += (dx / d) * k;
        p.y += (dy / d) * k;
      }
      const hit = nearest(pt.x, pt.y);
      if (hit >= 0) {
        ensureAudio(true);
        pointer.active = true;
        strike(1, true, hit, 0);
      }
    };
    const onMove = (e) => {
      const pt = local(e);
      if (lastPos.has) {
        pointer.dx = Math.max(-24, Math.min(24, pt.x - lastPos.x));
        pointer.dy = Math.max(-24, Math.min(24, pt.y - lastPos.y));
      }
      lastPos.x = pt.x; lastPos.y = pt.y; lastPos.has = true;
      pointer.x = pt.x; pointer.y = pt.y; pointer.active = true; pointer.moved = true;
      const dist = pointerField(pt.x, pt.y);
      const active = disturbedIdx;
      if (lastHover >= 0 && (active !== lastHover || disturbedDist > 55)) armed[lastHover] = true;
      if (active >= 0 && disturbedDist <= 55) { lastHover = active; strike(dist, pointer.grabbed.length > 0, active, disturbedDist); }
      else lastHover = -1;
      for (const g of pointer.grabbed) {
        g.p.x = pt.x + g.ox; g.p.y = pt.y + g.oy;
        g.p.px = g.p.x; g.p.py = g.p.y;
      }
    };
    const onUp = (e) => {
      if (pointer.pointerId === e.pointerId) {
        // open the fist: released points unpin and inherit the cursor's
        // recent velocity, so a flick throws the handful
        for (const g of pointer.grabbed) {
          g.p.pinned = false;
          g.p.px = g.p.x - pointer.dx;
          g.p.py = g.p.y - pointer.dy;
        }
        pointer.grabbed = [];
        pointer.pointerId = -1;
      }
      pointer.down = false;
      pointer.active = false;
    };
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    const step = (dd) => {
      const ps = phys.particles;
      if (!ps.length) return;
      for (const p of ps) {
        if (p.pinned) continue;
        const vx = (p.x - p.px) * DAMPING, vy = (p.y - p.py) * DAMPING;
        p.px = p.x; p.py = p.y;
        p.x += vx; p.y += vy + GRAVITY;
      }
      // mouse field goes in BEFORE the constraint solve (same order as the
      // original) so the chains absorb the push within the frame instead of
      // it plowing letters ahead of the cursor as raw velocity. It only fires
      // on frames where the cursor actually moved; while a handful is grabbed
      // the pins do the work, so skip it.
      if (pointer.moved && !pointer.grabbed.length) applyPointer(pointer.x, pointer.y, dd);
      pointer.moved = false;
      for (let n = 0; n < SOLVE_ITERS; n++) solve(phys.constraints, ps);
      pointer.dx *= 0.4; pointer.dy *= 0.4;
      for (const g of pointer.grabbed) {
        g.p.x = pointer.x + g.ox; g.p.y = pointer.y + g.oy;
        g.p.px = g.p.x; g.p.py = g.p.y;
      }
    };
    const draw = () => {
      if (!phys.width) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, phys.width, phys.height);
      const cols = phys.cols, ps = phys.particles, total = ps.length;
      const hw = glyphW * 0.5, hh = glyphHL * 0.5;
      for (let i = 0; i < total; i++) {
        const p = ps[i];
        if (p.dead) continue;
        if (p.y < -24 || p.y > phys.height + 24) continue;
        let ang = 0;
        if (i + cols < total && !ps[i + cols].dead) {
          const d = ps[i + cols];
          ang = Math.atan2(d.y - p.y, d.x - p.x) - Math.PI * 0.5;
        } else if (i - cols >= 0) {
          const a = ps[i - cols];
          ang = Math.atan2(p.y - a.y, p.x - a.x) - Math.PI * 0.5;
        }
        const ca = Math.cos(ang), sa = Math.sin(ang);
        ctx.setTransform(ca * dpr, sa * dpr, -sa * dpr, ca * dpr, p.x * dpr, p.y * dpr);
        const gl = atlas.get(p.char);
        if (gl) ctx.drawImage(gl, -hw, -hh, glyphW, glyphHL);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    let raf = 0;
    let lastT = 0;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      // real frame delta, clamped like the original (1..32ms) — dt² feeds the
      // mouse-field strength so it's refresh-rate independent
      const dt = Math.min(32, Math.max(1, now - (lastT || now - 16)));
      lastT = now;
      try { step(dt * dt); draw(); } catch (err) { console.error('chimes loop error', err); cancelAnimationFrame(raf); }
    };
    try { build(); draw(); } catch (err) { console.error('chimes build error', err); }
    raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(() => {
      try { build(); draw(); } catch (err) { console.error('chimes rebuild error', err); }
    });
    ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      ensureAudioRef.current = () => false;
      if (audio.ctx) audio.ctx.close().catch(() => {});
    };
  }, []);

  const togglePlay = () => {
    const next = !playing;
    playingRef.current = next;
    setPlaying(next);
    ensureAudioRef.current(next);
  };

  return (
    <section className="tet-hero" style={{ position: 'relative', width: '100%', minWidth: 1440, height: '130vh', background: `#E0D3BC url(${process.env.PUBLIC_URL}/paper.png) repeat`, overflow: 'hidden', userSelect: 'none', cursor: 'grab' }}>
      {/* paper grain — sits above everything so image and curtain share the texture */}
      <div className="tet-grain" style={{ position: 'absolute', inset: 0, opacity: 0.08, mixBlendMode: 'multiply', pointerEvents: 'none', zIndex: 10 }} />

      {/* top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', gap: 36, padding: '28px 48px', zIndex: 6 }}>
        <div style={{ font: `700 15px/1 ${MONO}`, color: '#33291D' }}>An H. Nguyen</div>
        <div style={{ display: 'flex', gap: 22, font: `13px/1 ${MONO}`, letterSpacing: '0.03em' }}>
          <a href="#about">About</a><span style={{ color: '#9a8c70' }}>·</span>
          <a href="#personal">Hobbies</a><span style={{ color: '#9a8c70' }}>·</span>
          <a href="#contact">Contact</a>
        </div>
        <button
          onClick={togglePlay}
          style={{ marginLeft: 'auto', background: '#4A3A2C', color: '#E8DCC4', border: 'none', cursor: 'pointer', font: `500 16px/1 ${SERIF}`, padding: '10px 28px', borderRadius: 6, boxShadow: '0 2px 6px rgba(50,35,15,0.3)' }}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>

      {/* soft cast shadow */}
      <div style={{ position: 'absolute', top: '44vh', left: '50%', width: 300, height: '56vh', transform: 'skewX(-22deg) translateX(150px)', background: 'linear-gradient(160deg, rgba(70,52,28,0.14), rgba(70,52,28,0) 72%)', pointerEvents: 'none', zIndex: 1 }} />

      {/* lion head + live beard */}
      <div style={{ position: 'absolute', top: '2vh', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
        {lionImgOk ? (
          <img
            src={`${process.env.PUBLIC_URL}/lion_head_no_beard.png`}
            alt="Lion dance head"
            onError={() => setLionImgOk(false)}
            draggable={false}
            style={{ width: 900, height: 'min(940px, 84vh)', objectFit: 'contain', position: 'relative', zIndex: 2 }}
          />
        ) : (
          <div style={{ width: 900, height: 'min(940px, 84vh)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #8b7a5e', color: '#6b5c44', font: `13px/1.5 ${MONO}`, textAlign: 'center', padding: 16, boxSizing: 'border-box' }}>
            hero photo — add public/lion_head_test_1.png (transparent png looks best)
          </div>
        )}
        {/* chime curtain IS the lion's beard now (image has none): as wide as
            the chin, tucked up behind the jaw fur so strands grow from it */}
        <div style={{ position: 'relative', width: 240, height: '50vh', marginTop: -80, zIndex: 1, overflow: 'visible' }}>
          <canvas ref={canvasRef} style={{ position: 'absolute', left: -700, top: -700, width: 'calc(100% + 1400px)', height: 'calc(100% + 1400px)', display: 'block', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* side destination cards */}
      <a href="#experience" style={{ position: 'absolute', top: 'min(32vh, calc(100vh - 480px))', left: '6%', zIndex: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, border: '1px solid #8b7a5e', padding: '18px 12px 12px', width: 88, background: 'rgba(255,250,238,0.12)' }}>
        <span style={{ width: 26, height: 10, border: '1.5px solid #8a2f22', borderRadius: 2, display: 'block' }} />
        <span style={{ font: `15px/1 ${SERIF}`, color: '#4A3A2C' }}>Experience</span>
      </a>
      <a href="#projects" style={{ position: 'absolute', top: 'min(32vh, calc(100vh - 480px))', right: '6%', zIndex: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, border: '1px solid #8b7a5e', padding: '18px 12px 12px', width: 88, background: 'rgba(255,250,238,0.12)' }}>
        <span style={{ width: 22, height: 12, background: '#8a2f22', borderRadius: '2px 2px 0 0', display: 'block' }} />
        <span style={{ font: `15px/1 ${SERIF}`, color: '#4A3A2C' }}>Projects</span>
      </a>

      {/* left headline — top-anchored so it stays in the first viewport now
          that the section extends past 100vh for the beard */}
      <div style={{ position: 'absolute', left: '5%', top: '64vh', width: 400, zIndex: 6 }}>
        <div style={{ font: `13px/1.4 ${MONO}`, color: '#6b5c44', marginBottom: 20 }}>
          <span style={{ color: '#4A3A2C', fontWeight: 700 }}>Duyên</span> A chance encounter
        </div>
        <h1 style={{ margin: 0, font: `400 50px/1.1 ${SERIF}`, letterSpacing: '-0.01em', color: '#33291D', textWrap: 'pretty' }}>
          Lion heads —— loud drums, quiet code, rivers full of lantern light
        </h1>
      </div>

      {/* bottom-right blurb — top-anchored to stay in the first viewport */}
      <div style={{ position: 'absolute', right: '6%', top: '79vh', width: 270, zIndex: 6 }}>
        <div style={{ font: `13px/1.8 ${MONO}`, color: '#5a4c38' }}>
          Drift through projects, odd experiments, and everything I build between lion dance seasons.
        </div>
        <a href="#contact" style={{ display: 'inline-block', marginTop: 16, font: `13px/1 ${MONO}`, borderBottom: '1px solid #33291D', paddingBottom: 2 }}>
          Contact
        </a>
      </div>
    </section>
  );
}
