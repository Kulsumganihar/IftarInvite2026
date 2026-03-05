import React, { useEffect, useRef } from 'react';

const GOLD_COLORS = [
  'rgba(255,232,138,',
  'rgba(240,192,64,',
  'rgba(255,180,40,',
  'rgba(255,255,200,',
  'rgba(255,215,0,',
];

function rand(a, b) { 
  return a + Math.random() * (b - a); 
}

function randGold() { 
  return GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)]; 
}

function drawStar(ctx, cx, cy, outerR, innerR, points, colorStr) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = (i * Math.PI) / points - Math.PI / 2;
    ctx[i === 0 ? 'moveTo' : 'lineTo'](cx + r * Math.cos(a), cy + r * Math.sin(a));
  }
  ctx.closePath();
  ctx.fillStyle = colorStr + '0.85)';
  ctx.fill();
}

class Particle {
  constructor(W, H, init = false) {
    this.W = W;
    this.H = H;
    this.reset(init);
  }

  reset(init) {
    this.x = rand(0, this.W);
    this.y = init ? rand(0, this.H) : rand(this.H, this.H + 40);
    this.vx = rand(-0.4, 0.4);
    this.vy = rand(-2.5, -1.5);
    this.size = rand(1, 3.5);
    this.alpha = rand(0.3, 1);
    this.fade = rand(0.002, 0.005);
    this.color = randGold();
    this.shape = Math.random() > 0.5 ? 'circle' : 'star';
    this.rot = rand(0, Math.PI * 2);
    this.rotV = rand(-0.03, 0.03);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.fade;
    this.rot += this.rotV;
    if (this.alpha <= 0 || this.y < -10) this.reset(false);
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    if (this.shape === 'star') {
      drawStar(ctx, 0, 0, this.size * 2, this.size, 4, this.color);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
      g.addColorStop(0, this.color + '1)');
      g.addColorStop(0.4, this.color + '0.9)');
      g.addColorStop(1, this.color + '0)');
      ctx.fillStyle = g;
      ctx.fill();
    }
    ctx.restore();
  }
}

class Sparkle {
  constructor(W, H) {
    this.W = W;
    this.H = H;
    this.reset();
  }

  reset() {
    this.x = rand(0, this.W);
    this.y = rand(0, this.H);
    this.size = rand(1, 2);
    this.alpha = 0;
    this.maxAlpha = rand(0.4, 0.9);
    this.phase = rand(0, Math.PI * 2);
    this.speed = rand(0.01, 0.04);
    this.color = randGold();
  }

  update() {
    this.phase += this.speed;
    this.alpha = Math.max(0, Math.sin(this.phase) * this.maxAlpha);
    if (this.phase > Math.PI * 2 * 5 && Math.random() < 0.005) this.reset();
  }

  draw(ctx) {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.strokeStyle = this.color + '1)';
    ctx.lineWidth = this.size * 0.5;
    const s = this.size * 6;
    ctx.beginPath();
    ctx.moveTo(this.x - s, this.y);
    ctx.lineTo(this.x + s, this.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - s);
    ctx.lineTo(this.x, this.y + s);
    ctx.stroke();
    ctx.restore();
  }
}

export default function GlitterCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;
    let particles = [];
    let sparkles = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function init() {
      resize();
      particles = Array.from({ length: 220 }, () => new Particle(W, H, true));
      sparkles = Array.from({ length: 60 }, () => new Sparkle(W, H));
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      sparkles.forEach(s => {
        s.update();
        s.draw(ctx);
      });
      animId = requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 3
      }}
    />
  );
}
