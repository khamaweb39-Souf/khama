import { useEffect, useRef, useState, useCallback } from 'react';

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
  { value: 12400, suffix: '+', label: 'Références de tissus' },
  { value: 850,   suffix: '',  label: 'Fournisseurs vérifiés' },
  { value: 47,    suffix: '',  label: 'Pays couverts' },
  { value: 98,    suffix: '%', label: 'Satisfaction client' },
];

const FIBER_COLORS = [
  'rgba(201,168,76,0.55)',
  'rgba(232,204,122,0.45)',
  'rgba(245,240,232,0.35)',
  'rgba(188,154,80,0.4)',
  'rgba(214,190,130,0.3)',
  'rgba(255,235,180,0.25)',
];

const H1_LINE_1 = "L'excellence textile,";
const H1_LINE_2 = "à portée de clic.";

/* ─── Hook: Counter Up ───────────────────────────────────────────────── */
function useCounterUp(target: number, duration: number = 2200, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
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

/* ─── Component: Animated Counter ────────────────────────────────────── */
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
        {stat.value >= 1000
          ? count.toLocaleString('fr-FR')
          : count}
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

/* ─── Component: Animated H1 Letter by Letter ───────────────────────── */
function AnimatedH1({ line, baseDelay }: { line: string; baseDelay: number }) {
  return (
    <span className="block">
      {line.split('').map((char, i) => (
        <span
          key={i}
          aria-hidden={char === ' ' ? undefined : undefined}
          className="letter-char"
          style={{
            animationDelay: `${baseDelay + i * 42}ms`,
            ...(char === ' ' ? { width: '0.28em', display: 'inline-block' } : {}),
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

/* ─── Component: Fibers Canvas Layer ─────────────────────────────────── */
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
        const animName = isHoriz
          ? 'fiber-horizontal'
          : f.id % 2 === 0
          ? 'fiber-float'
          : 'fiber-float-alt';

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

/* ─── Component: Scroll Indicator ────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      aria-label="Défiler vers le bas"
    >
      <span
        className="font-body text-xs tracking-[0.2em] uppercase"
        style={{ color: 'rgba(245,240,232,0.4)', letterSpacing: '0.18em' }}
      >
        Découvrir
      </span>
      <div
        className="relative flex flex-col items-center"
        style={{ animation: 'scroll-pulse 1.8s ease-in-out infinite' }}
      >
        {/* Scroll track */}
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(201,168,76,0.8), transparent)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)',
              animation: 'scroll-chevron 1.8s ease-in-out infinite',
            }}
          />
        </div>
        {/* Chevron */}
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
          <path
            d="M1 1L6 6L11 1"
            stroke="rgba(201,168,76,0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ─── Component: Decorative Gold Lines ──────────────────────────────── */
function GoldDecorLines() {
  return (
    <div className="absolute inset-0 pointer-events-none z-4 overflow-hidden" aria-hidden="true">
      {/* Top-left corner bracket */}
      <div style={{
        position: 'absolute', top: '2rem', left: '2rem',
        width: '48px', height: '48px',
        borderTop: '1px solid rgba(201,168,76,0.35)',
        borderLeft: '1px solid rgba(201,168,76,0.35)',
      }} />
      {/* Top-right corner bracket */}
      <div style={{
        position: 'absolute', top: '2rem', right: '2rem',
        width: '48px', height: '48px',
        borderTop: '1px solid rgba(201,168,76,0.35)',
        borderRight: '1px solid rgba(201,168,76,0.35)',
      }} />
      {/* Bottom-right corner bracket */}
      <div style={{
        position: 'absolute', bottom: '2rem', right: '2rem',
        width: '48px', height: '48px',
        borderBottom: '1px solid rgba(201,168,76,0.25)',
        borderRight: '1px solid rgba(201,168,76,0.25)',
      }} />
    </div>
  );
}

/* ─── Main HeroSection Component ─────────────────────────────────────── */
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const ticking = useRef(false);

  /* Detect prefers-reduced-motion */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
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
      className="hero-section grain-overlay"
      style={{ minHeight: '100vh', background: 'var(--obsidian)' }}
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
          {/* Fallback image always shown behind video */}
          <img
            src="/images/loom-fallback.jpg"
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

          {/* Video (if available) */}
          {!videoError && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              onError={() => setVideoError(true)}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 30%',
                opacity: 0,
                transition: 'opacity 1.2s ease',
              }}
              onCanPlay={(e) => {
                (e.target as HTMLVideoElement).style.opacity = '1';
              }}
            >
              {/* 
                Add your video source here when available:
                <source src="/video/loom-weaving.mp4" type="video/mp4" />
              */}
            </video>
          )}
        </div>

        {/* Gradient overlays */}
        {/* Diagonal ecru overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                125deg,
                rgba(13,12,10,0.92)  0%,
                rgba(26,25,23,0.82)  25%,
                rgba(245,240,232,0.08) 58%,
                rgba(13,12,10,0.65)  100%
              )
            `,
            animation: 'overlay-breathe 8s ease-in-out infinite',
            zIndex: 1,
          }}
        />
        {/* Bottom gradient for stat section */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'linear-gradient(to top, rgba(13,12,10,0.97), transparent)',
            zIndex: 1,
          }}
        />
        {/* Left vignette */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0, left: 0, bottom: 0,
            width: '55%',
            background: 'linear-gradient(to right, rgba(13,12,10,0.88), transparent)',
            zIndex: 1,
          }}
        />
        {/* Subtle top edge */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '20%',
            background: 'linear-gradient(to bottom, rgba(13,12,10,0.7), transparent)',
            zIndex: 1,
          }}
        />
      </div>

      {/* ── Fibers Layer ───────────────────────────────────────────── */}
      <FibersLayer reducedMotion={reducedMotion} />

      {/* ── Decorative Gold Corner Lines ───────────────────────────── */}
      <GoldDecorLines />

      {/* ── Navigation bar strip ───────────────────────────────────── */}
      <nav
        style={{
          position: 'relative',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 2.5rem',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
        }}
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Logomark */}
          <div style={{
            width: '36px', height: '36px',
            border: '1.5px solid var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              inset: '4px',
              border: '1px solid rgba(201,168,76,0.4)',
            }} />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2 L7 7 L12 2 M2 12 L7 7 L12 12" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <span
            className="font-display"
            style={{
              fontSize: '1.6rem',
              fontWeight: 400,
              letterSpacing: '0.18em',
              color: 'var(--ecru)',
              textTransform: 'uppercase',
            }}
          >
            Khama
          </span>
        </div>

        {/* Nav links — hidden on mobile */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
          className="hidden md:flex"
        >
          {['Catalogue', 'Fournisseurs', 'Solutions', 'À propos'].map((item) => (
            <a
              key={item}
              href="#"
              className="font-body"
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.58)',
                textDecoration: 'none',
                transition: 'color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ecru)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,240,232,0.58)')}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Nav CTA */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a
            href="#"
            className="font-body hidden md:inline-flex items-center"
            style={{
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.65)',
              textDecoration: 'none',
              padding: '0.45rem 1rem',
              border: '1px solid rgba(245,240,232,0.18)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--ecru)';
              e.currentTarget.style.borderColor = 'rgba(245,240,232,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(245,240,232,0.65)';
              e.currentTarget.style.borderColor = 'rgba(245,240,232,0.18)';
            }}
          >
            Connexion
          </a>
          <a
            href="#"
            className="btn-gold font-body inline-flex items-center"
            style={{
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--obsidian)',
              textDecoration: 'none',
              padding: '0.45rem 1.25rem',
              fontWeight: 600,
            }}
          >
            S'inscrire
          </a>
        </div>
      </nav>

      {/* ── Main Hero Content ──────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '3rem 2.5rem 6rem',
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '680px' }}>

          {/* ── Badge ────────────────────────────────────────────── */}
          <div
            className="badge-anim"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              marginBottom: '2rem',
              padding: '0.45rem 1rem',
              border: '1px solid rgba(201,168,76,0.45)',
              background: 'rgba(201,168,76,0.08)',
              backdropFilter: 'blur(8px)',
              opacity: 0,
              animation: contentVisible
                ? 'badge-enter 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s forwards'
                : 'none',
            }}
            aria-label="Badge : Plateforme Textile Professionnelle N°1 au Maghreb et Afrique"
          >
            <span
              style={{
                fontSize: '0.7rem',
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
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--gold-light)',
                fontWeight: 500,
              }}
            >
              Plateforme Textile Professionnelle N°1 au Maghreb &amp; Afrique
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                animation: reducedMotion ? 'none' : 'star-spin 4s linear infinite reverse',
                display: 'inline-block',
                color: 'var(--gold)',
              }}
              aria-hidden="true"
            >
              ✦
            </span>
          </div>

          {/* ── H1 : Sequential letter animation ─────────────────── */}
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              color: 'var(--ecru)',
              marginBottom: '1.6rem',
              perspective: '800px',
            }}
          >
            {contentVisible && (
              <>
                <AnimatedH1 line={H1_LINE_1} baseDelay={350} />
                <span
                  className="block"
                  style={{
                    background: `linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 40%, var(--gold-dark) 70%, var(--gold-light) 100%)`,
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: reducedMotion ? 'none' : 'shimmer-gold 4s linear infinite',
                    fontStyle: 'italic',
                    fontWeight: 400,
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
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              lineHeight: 1.7,
              color: 'rgba(245,240,232,0.68)',
              marginBottom: '2.5rem',
              maxWidth: '520px',
              opacity: 0,
              animation: contentVisible
                ? 'word-slide-up 0.8s cubic-bezier(0.22,1,0.36,1) 1.6s forwards'
                : 'none',
            }}
          >
            Khama connecte les professionnels de l'industrie textile&nbsp;:
            <br />
            <span style={{ color: 'rgba(245,240,232,0.45)' }}>
              acheteurs, fournisseurs, designers et bureaux d'études.
            </span>
          </p>

          {/* ── CTA Group ────────────────────────────────────────── */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1rem',
              opacity: 0,
              animation: contentVisible
                ? 'cta-enter 0.75s cubic-bezier(0.22,1,0.36,1) 1.9s forwards'
                : 'none',
            }}
          >
            {/* Primary CTA */}
            <a
              href="#"
              className="btn-gold font-body inline-flex items-center gap-2"
              style={{
                fontSize: '0.88rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--obsidian)',
                textDecoration: 'none',
                padding: '0.9rem 2rem',
                whiteSpace: 'nowrap',
              }}
            >
              Explorer le Catalogue
              <span
                style={{ animation: reducedMotion ? 'none' : 'arrow-nudge 1.5s ease-in-out infinite' }}
                aria-hidden="true"
              >
                →
              </span>
            </a>

            {/* Ghost CTA */}
            <a
              href="#"
              className="btn-ghost font-body inline-flex items-center gap-2"
              style={{
                fontSize: '0.88rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ecru)',
                textDecoration: 'none',
                padding: '0.9rem 2rem',
                whiteSpace: 'nowrap',
              }}
            >
              Publier une offre
            </a>

            {/* Text link */}
            <a
              href="#"
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
              Découvrir Khama Pro
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
            </a>
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
            Textile · Soie · Laine · Coton
          </span>
        </div>
      </div>

      {/* ── Scroll Indicator ──────────────────────────────────────── */}
      <ScrollIndicator />
    </section>
  );
}
