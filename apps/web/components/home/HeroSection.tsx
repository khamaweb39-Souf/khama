'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

/* ─── Types ──────────────────────────────────────────────────────────── */
interface Fiber {
  id: number;
  x: number;
  width: number;
  height: number;
  delay: number;
  duration: number;
  color: string;
  type: 'vertical' | 'horizontal' | 'diagonal';
  opacity: number;
  rotate: number;
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

/* ─── Constants ──────────────────────────────────────────────────────── */
const STATS: StatItem[] = [
  { value: 12400, suffix: '+', label: 'مرجع نسيجي' },
  { value: 850,   suffix: '',  label: 'مورد معتمد' },
  { value: 47,    suffix: '',  label: 'دولة مغطاة' },
  { value: 98,    suffix: '%', label: 'رضا العملاء' },
];

const FIBER_COLORS = [
  'rgba(201,168,76,0.55)',
  'rgba(232,204,122,0.45)',
  'rgba(245,240,232,0.35)',
  'rgba(188,154,80,0.4)',
  'rgba(214,190,130,0.3)',
  'rgba(255,235,180,0.25)',
];

const H1_LINE_1 = "فخامة المنسوجات،";
const H1_LINE_2 = "بلمسة زر واحدة.";

/* ─── Main HeroSection Component ─────────────────────────────────────── */
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const ticking = useRef(false);

  /* Detect prefers-reduced-motion */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) setReducedMotion(true);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* Start content animation after mount */
  useEffect(() => {
    const t = setTimeout(() => setContentVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  /* Parallax scroll on bg */
  const handleScroll = useCallback(() => {
    if (reducedMotion || ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      if (!heroRef.current || !bgRef.current) { ticking.current = false; return; }
      const scrolled = window.scrollY;
      const heroH = heroRef.current.offsetHeight;
      if (scrolled <= heroH) {
        const pct = (scrolled / heroH) * 30;
        bgRef.current.style.transform = `scale(1.08) translateY(${pct}%)`;
      }
      ticking.current = false;
    });
  }, [reducedMotion]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* Intersection observer for stats */
  useEffect(() => {
    const statsEl = document.getElementById('hero-stats');
    if (!statsEl) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(statsEl);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section grain-overlay pattern-jacquard"
      style={{ minHeight: '100vh', background: 'var(--navy)' }}
      aria-label="Section principale Khama"
    >
      {/* ── Background Layer ───────────────────────────────────────── */}
      <div className="hero-bg" style={{ zIndex: 0 }}>
        <div
          ref={bgRef}
          style={{
            position: 'absolute',
            inset: '-8%',
            transform: 'scale(1.08)',
            transition: 'transform 0.1s linear',
            willChange: 'transform',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1920&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
            }}
          />
        </div>

        {/* Gradient overlays - Refined for Navy */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                125deg,
                rgba(10,22,40,0.95) 0%,
                rgba(10,22,40,0.85) 35%,
                rgba(201,168,76,0.05) 60%,
                rgba(10,22,40,0.7) 100%
              )
            `,
            zIndex: 1,
          }}
        />
        {/* Bottom silk gradient */}
        <div
          aria-hidden="true"
          className="animate-silk"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, var(--navy), transparent)',
            zIndex: 1,
          }}
        />
      </div>

      {/* ── Fibers Layer ───────────────────────────────────────────── */}
      <FibersLayer reducedMotion={reducedMotion} />

      {/* ── Main Hero Content ──────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '8rem 2.5rem 6rem',
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '750px' }}>

          {/* ── Badge ────────────────────────────────────────────── */}
          <div
            className="badge-anim glass-card"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '2.5rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '999px',
              opacity: 0,
              animation: contentVisible
                ? 'badge-enter 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s forwards'
                : 'none',
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                animation: reducedMotion ? 'none' : 'star-spin 4s linear infinite',
                display: 'inline-block',
                color: 'var(--gold)',
              }}
              aria-hidden="true"
            >
              ✦
            </span>
            <span
              className="font-body"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                fontWeight: 900,
              }}
            >
              المنصة الاحترافية الأولى للمنسوجات في المغرب العربي
            </span>
          </div>

          {/* ── H1 : Premium Gold Gradient ─────────────────── */}
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              color: 'var(--cream)',
              marginBottom: '2rem',
              perspective: '1000px',
            }}
          >
            {contentVisible && (
              <>
                <AnimatedH1 line={H1_LINE_1} baseDelay={350} />
                <span
                  className="block mt-2"
                  style={{
                    background: `linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 40%, var(--gold-dark) 70%, var(--gold-light) 100%)`,
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: reducedMotion ? 'none' : 'shimmer-gold 4s linear infinite',
                  }}
                >
                  <AnimatedH1 line={H1_LINE_2} baseDelay={350 + H1_LINE_1.length * 42 + 100} />
                </span>
              </>
            )}
          </h1>

          {/* ── Subtitle ─────────────────────────────────────────── */}
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              lineHeight: 1.8,
              color: 'rgba(253,248,240,0.7)',
              marginBottom: '3rem',
              maxWidth: '580px',
              opacity: 0,
              animation: contentVisible
                ? 'word-slide-up 0.8s cubic-bezier(0.22,1,0.36,1) 1.6s forwards'
                : 'none',
            }}
          >
            خامة تربط محترفي صناعة النسيج بذكاء :
            المشترون، الموردون، المصممون، ومكاتب الدراسات في سوق واحد متكامل.
          </p>

          {/* ── CTA Group ────────────────────────────────────────── */}
          <div
            className="flex flex-wrap items-center gap-5"
            style={{
              opacity: 0,
              animation: contentVisible
                ? 'cta-enter 0.8s cubic-bezier(0.22,1,0.36,1) 1.9s forwards'
                : 'none',
            }}
          >
            <Link href="/fabrics">
              <Button variant="premium" size="xl" rightIcon={<span>→</span>}>
                استكشف الكتالوج
              </Button>
            </Link>

            <Link href="/rfq/create">
              <Button variant="outline" size="xl">
                انشر طلب عرض
              </Button>
            </Link>
          </div>

            {/* Text link */}
            <Link
              href="/academy"
              className="font-body"
              style={{
                fontSize: '0.85rem',
                fontWeight: 400,
                letterSpacing: '0.06em',
                color: 'rgba(201,168,76,0.75)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                position: 'relative',
                paddingBottom: '2px',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = 'var(--gold-light)';
                const line = el.querySelector('.hover-line') as HTMLElement;
                if (line) {
                  line.style.transform = 'scaleX(1)';
                  line.style.transformOrigin = 'left';
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = 'rgba(201,168,76,0.75)';
                const line = el.querySelector('.hover-line') as HTMLElement;
                if (line) {
                  line.style.transform = 'scaleX(0)';
                  line.style.transformOrigin = 'right';
                }
              }}
            >
              اكتشف خامة برو
              <span aria-hidden="true">↗</span>
              <span
                className="hover-line"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'var(--gold)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'right',
                  transition: 'transform 0.3s ease',
                }}
              />
            </Link>
          </div>
        </div>

        {/* ── Thin gold rule ─────────────────────────────────────── */}
        <div
          style={{
            marginTop: '4rem',
            height: '1px',
            background: 'linear-gradient(to right, rgba(201,168,76,0.5), rgba(201,168,76,0.15), transparent)',
            opacity: 0,
            animation: contentVisible
              ? 'stat-line-expand 1s cubic-bezier(0.22,1,0.36,1) 2s forwards'
              : 'none',
          }}
          aria-hidden="true"
        />

        {/* ── Stats Row ──────────────────────────────────────────── */}
        <div
          id="hero-stats"
          style={{
            marginTop: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0',
            position: 'relative',
          }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
              <div style={{ flex: 1, paddingRight: i < STATS.length - 1 ? '1.5rem' : 0 }}>
                <AnimatedCounter stat={stat} start={statsVisible} delay={i * 180} />
              </div>
              {i < STATS.length - 1 && (
                <div
                  className="stat-separator"
                  style={{ marginLeft: '1.5rem', alignSelf: 'stretch', minHeight: '60px' }}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

      {/* ── Right side decorative panel ──────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '38%',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      >
        {/* Subtle right-panel overlay that makes image more visible */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to left, rgba(13,12,10,0.25), rgba(13,12,10,0.72) 100%)',
        }} />

        {/* Floating label */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '2.5rem',
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          opacity: 0,
          animation: contentVisible
            ? 'cta-enter 1s cubic-bezier(0.22,1,0.36,1) 2.2s forwards'
            : 'none',
        }}>
          <div style={{
            width: '30px', height: '1px',
            background: 'rgba(201,168,76,0.5)',
          }} />
          <span
            className="font-body"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
            }}
          >
            منسوجات · حرير · صوف · قطن
          </span>
        </div>
      </div>

      {/* ── Scroll Indicator ──────────────────────────────────────── */}
      <ScrollIndicator />
    </section>
  );
}

/* ─── Helper Components ─────────────────────────────────────────────── */

function useCounterUp(target: number, duration: number = 2200, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

function AnimatedCounter({ stat, start, delay }: { stat: StatItem; start: boolean; delay: number }) {
  const count = useCounterUp(stat.value, 2400, start);
  return (
    <div
      className="stat-item flex flex-col items-center md:items-start"
      style={{
        opacity: 0,
        animation: start ? `counter-enter 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms forwards` : 'none',
      }}
    >
      <div
        className="font-display text-4xl md:text-5xl font-semibold leading-none tracking-tight"
        style={{ color: 'var(--gold)' }}
      >
        {stat.value >= 1000 ? count.toLocaleString('fr-FR') : count}
        <span style={{ color: 'var(--gold-light)' }}>{stat.suffix}</span>
      </div>
      <div
        className="font-body mt-1.5 text-xs md:text-sm font-light tracking-wider uppercase"
        style={{ color: 'rgba(245,240,232,0.58)', letterSpacing: '0.1em' }}
      >
        {stat.label}
      </div>
      <div
        className="mt-3 h-px"
        style={{
          background: 'linear-gradient(to right, var(--gold), transparent)',
          animation: start ? `stat-line-expand 0.9s cubic-bezier(0.22,1,0.36,1) ${delay + 200}ms both` : 'none',
          opacity: 0,
          width: '100%',
        }}
      />
    </div>
  );
}

function AnimatedH1({ line, baseDelay }: { line: string; baseDelay: number }) {
  const words = line.split(' ');
  return (
    <span className="block">
      {words.map((word, i) => (
        <span
          key={i}
          className="letter-char"
          style={{
            animationDelay: `${baseDelay + i * 150}ms`,
            display: 'inline-block',
            marginRight: '0.25em'
          }}
        >
          {word}{" "}
        </span>
      ))}
    </span>
  );
}

function FibersLayer({ reducedMotion }: { reducedMotion: boolean }) {
  const fibers = useRef<Fiber[]>([]);
  if (fibers.current.length === 0) {
    const total = 28;
    for (let i = 0; i < total; i++) {
      const type = i % 5 === 0 ? 'horizontal' : i % 7 === 0 ? 'diagonal' : 'vertical';
      fibers.current.push({
        id: i,
        x: Math.random() * 100,
        width: type === 'vertical' ? 1 + Math.random() * 1.5 : 40 + Math.random() * 80,
        height: type === 'vertical' ? 60 + Math.random() * 120 : 1 + Math.random() * 1.5,
        delay: Math.random() * 14000,
        duration: 10000 + Math.random() * 12000,
        color: FIBER_COLORS[Math.floor(Math.random() * FIBER_COLORS.length)],
        type,
        opacity: 0.2 + Math.random() * 0.5,
        rotate: type === 'diagonal' ? -35 + Math.random() * 70 : Math.random() * 8 - 4,
      });
    }
  }
  if (reducedMotion) return null;
  return (
    <div className="fibers-layer" aria-hidden="true">
      {fibers.current.map((f) => {
        const isHoriz = f.type === 'horizontal';
        const animName = isHoriz ? 'fiber-horizontal' : f.id % 2 === 0 ? 'fiber-float' : 'fiber-float-alt';
        return (
          <div
            key={f.id}
            style={{
              position: 'absolute',
              left: `${f.x}%`,
              bottom: isHoriz ? `${10 + Math.random() * 80}%` : '-10%',
              width: `${f.width}px`,
              height: `${f.height}px`,
              background: f.color,
              borderRadius: '999px',
              transform: `rotate(${f.rotate}deg)`,
              animation: `${animName} ${f.duration}ms linear ${f.delay}ms infinite`,
              filter: 'blur(0.4px)',
              mixBlendMode: 'screen' as const,
            }}
          />
        );
      })}
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
      <span className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(245,240,232,0.4)', letterSpacing: '0.18em' }}>
        اكتشف المزيد
      </span>
      <div className="relative flex flex-col items-center" style={{ animation: 'scroll-pulse 1.8s ease-in-out infinite' }}>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(201,168,76,0.8), transparent)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)', animation: 'scroll-chevron 1.8s ease-in-out infinite' }} />
        </div>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
          <path d="M1 1L6 6L11 1" stroke="rgba(201,168,76,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
