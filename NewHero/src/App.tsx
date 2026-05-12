import HeroSection from './components/HeroSection';

export default function App() {
  return (
    <div style={{ background: '#0D0C0A', minHeight: '100vh' }}>
      <HeroSection />

      {/* ── Below-fold teaser (demonstrates scroll context) ──────── */}
      <section
        style={{
          minHeight: '40vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6rem 2rem',
          background: 'linear-gradient(to bottom, #0D0C0A, #111009)',
          borderTop: '1px solid rgba(201,168,76,0.08)',
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.78rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.22)',
          }}
        >
          ✦ La plateforme continue ci-dessous ✦
        </p>
      </section>
    </div>
  );
}
