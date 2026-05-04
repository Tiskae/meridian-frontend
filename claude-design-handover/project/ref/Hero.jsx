// Meridian Motors — Hero component
// Light mode hero with ken-burns bg image, editorial crosshair, asymmetric layout

const Hero = ({ onViewCollection }) => {
  return (
    <section style={heroStyles.section}>
      {/* Ken-Burns background placeholder */}
      <div style={heroStyles.bgWrap}>
        <div style={heroStyles.bg}></div>
        <div style={heroStyles.bgOverlay}></div>
      </div>

      {/* Editorial crosshairs */}
      <div style={heroStyles.crosshair}>
        <span style={heroStyles.crosshairText}>6.453°N  3.396°E</span>
        <span style={heroStyles.crosshairText}>Victoria Island, Lagos</span>
      </div>

      {/* Main content — asymmetric, left-weighted */}
      <div style={heroStyles.content}>
        <div style={heroStyles.col}>
          <div style={heroStyles.sectionLabel}>— Now in Showroom</div>
          <h1 style={heroStyles.headline}>
            A considered collection<br />of <em style={{fontStyle:'italic'}}>exceptional</em> cars.
          </h1>
          <div style={heroStyles.subline}>
            Meridian Motors presents the finest pre-owned automobiles<br />
            in Lagos — sourced, inspected, and presented with singular intention.
          </div>
          <div style={heroStyles.ctaRow}>
            <button style={heroStyles.btnPrimary} onClick={onViewCollection}>
              View the Collection
            </button>
            <button style={heroStyles.btnSecondary}>
              Book a Private Viewing
            </button>
          </div>
        </div>

        {/* Featured vehicle meta — right side */}
        <div style={heroStyles.meta}>
          <div style={heroStyles.metaLabel}>— Featured Vehicle</div>
          <div style={heroStyles.metaTitle}>Mercedes-Benz <em style={{fontStyle:'italic'}}>G 63 AMG</em></div>
          <div style={heroStyles.metaDivider}></div>
          <div style={heroStyles.metaSpecs}>
            {[
              ['Year', '2023'],
              ['Engine', '4.0L Biturbo V8'],
              ['Mileage', '12,400 km'],
              ['Price', '₦285,000,000'],
            ].map(([k, v]) => (
              <div key={k} style={heroStyles.specRow}>
                <span style={heroStyles.specKey}>{k}</span>
                <span style={heroStyles.specSep}>—</span>
                <span style={heroStyles.specVal}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const heroStyles = {
  section: {
    position: 'relative',
    background: '#f6f5f2',
    minHeight: '92vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0 80px 80px',
    overflow: 'hidden',
  },
  bgWrap: {
    position: 'absolute', inset: 0, zIndex: 0,
  },
  bg: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(135deg, #c9c5b8 0%, #706b5d 40%, #3f3c34 100%)',
    animation: 'kenBurns 8000ms cubic-bezier(0.16,1,0.3,1) forwards',
  },
  bgOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to bottom, rgba(246,245,242,0.1) 0%, rgba(246,245,242,0.75) 60%, rgba(246,245,242,0.95) 100%)',
  },
  crosshair: {
    position: 'absolute', top: 32, left: 80, right: 80,
    display: 'flex', justifyContent: 'space-between',
    zIndex: 1,
  },
  crosshairText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
    color: '#706b5d',
  },
  content: {
    position: 'relative', zIndex: 1,
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
    gap: '40px',
  },
  col: { flex: '0 0 58%' },
  sectionLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
    color: '#706b5d', marginBottom: '20px',
  },
  headline: {
    fontFamily: "'Instrument Serif', Georgia, serif",
    fontSize: 'clamp(44px, 6vw, 80px)',
    fontWeight: 400, lineHeight: 1.05,
    letterSpacing: '-0.02em', color: '#0a0a09',
    marginBottom: '24px',
  },
  subline: {
    fontFamily: "'Manrope', sans-serif",
    fontSize: '16px', fontWeight: 300,
    lineHeight: 1.65, color: '#3f3c34',
    marginBottom: '40px',
  },
  ctaRow: { display: 'flex', gap: '16px', alignItems: 'center' },
  btnPrimary: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
    background: '#0a0a09', color: '#f6f5f2',
    padding: '14px 28px', border: 'none', cursor: 'pointer', borderRadius: 0,
    transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
  },
  btnSecondary: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
    background: 'transparent', color: '#0a0a09',
    padding: '14px 28px', border: '1px solid #0a0a09', cursor: 'pointer', borderRadius: 0,
    transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
  },
  meta: {
    flex: '0 0 34%',
    borderLeft: '1px solid rgba(201,197,184,0.5)',
    paddingLeft: '32px',
  },
  metaLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
    color: '#706b5d', marginBottom: '12px',
  },
  metaTitle: {
    fontFamily: "'Instrument Serif', Georgia, serif",
    fontSize: '22px', color: '#0a0a09', marginBottom: '16px', lineHeight: 1.2,
  },
  metaDivider: {
    width: '100%', height: '1px',
    background: 'rgba(201,197,184,0.5)', marginBottom: '16px',
  },
  metaSpecs: { display: 'flex', flexDirection: 'column', gap: '8px' },
  specRow: {
    display: 'flex', gap: '8px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
  },
  specKey: { color: '#706b5d', minWidth: '64px' },
  specSep: { color: '#a29d8c' },
  specVal: { color: '#0a0a09' },
};

Object.assign(window, { Hero });
