// Meridian Motors — Hero section
// Light mode, ken-burns bg, asymmetric layout, location label (Lekki, Lagos)

const Hero = ({ onViewCollection }) => {
  const [revealed, setRevealed] = React.useState(false);
  React.useEffect(() => { requestAnimationFrame(() => setRevealed(true)); }, []);

  const revealStyle = (delay = 0) => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(24px)',
    filter: revealed ? 'blur(0)' : 'blur(4px)',
    transition: `opacity 800ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 800ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 800ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section style={{
      position: 'relative',
      background: '#f6f5f2',
      minHeight: '92vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '0 80px 80px',
      overflow: 'hidden',
    }}>
      {/* Ken-Burns background placeholder */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(145deg, #d4d0c8 0%, #a8a498 25%, #706b5d 50%, #3f3c34 80%, #1a1918 100%)',
          animation: 'kenBurns 8000ms cubic-bezier(0.16,1,0.3,1) forwards',
        }}></div>
        {/* Overlay to ensure text readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(246,245,242,0.05) 0%, rgba(246,245,242,0.6) 45%, rgba(246,245,242,0.92) 70%, rgba(246,245,242,1) 100%)',
        }}></div>
      </div>

      {/* Location label — replaces editorial crosshair */}
      <div style={{
        position: 'absolute', top: 32, left: 80,
        zIndex: 1,
        ...revealStyle(200),
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#706b5d',
        }}>Lekki, Lagos</span>
      </div>

      {/* Vol label top-right */}
      <div style={{
        position: 'absolute', top: 32, right: 80,
        zIndex: 1,
        ...revealStyle(300),
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#706b5d',
        }}>Vol. 01 — Spring 2026</span>
      </div>

      {/* Main content — asymmetric, left-weighted */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        gap: '40px',
      }}>
        <div style={{ flex: '0 0 58%' }}>
          <div style={{
            ...revealStyle(100),
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#706b5d', marginBottom: '20px',
          }}>— Now in Showroom</div>

          <h1 style={{
            ...revealStyle(200),
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(44px, 6vw, 80px)',
            fontWeight: 400, lineHeight: 1.05,
            letterSpacing: '-0.02em', color: '#0a0a09',
            marginBottom: '24px',
          }}>
            A considered collection<br />of <em style={{fontStyle:'italic'}}>exceptional</em> cars.
          </h1>

          <div style={{
            ...revealStyle(350),
            fontFamily: "'Manrope', sans-serif",
            fontSize: '16px', fontWeight: 300,
            lineHeight: 1.65, color: '#3f3c34',
            marginBottom: '40px', maxWidth: '480px',
          }}>
            Meridian Motors presents the finest pre-owned automobiles
            in Lagos — sourced, inspected, and presented with singular intention.
          </div>

          <div style={{ ...revealStyle(450), display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              onClick={onViewCollection}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                background: '#0a0a09', color: '#f6f5f2',
                padding: '14px 28px', border: 'none', cursor: 'pointer', borderRadius: 0,
                transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >View the Collection</button>
            <button
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                background: 'transparent', color: '#0a0a09',
                padding: '14px 28px', border: '1px solid #0a0a09', cursor: 'pointer', borderRadius: 0,
                transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >Book a Private Viewing</button>
          </div>
        </div>

        {/* Featured vehicle meta — right side */}
        <div style={{
          ...revealStyle(500),
          flex: '0 0 34%',
          borderLeft: '1px solid rgba(201,197,184,0.5)',
          paddingLeft: '32px',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#706b5d', marginBottom: '12px',
          }}>— Featured Vehicle</div>
          <div style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: '22px', color: '#0a0a09', marginBottom: '16px', lineHeight: 1.2,
          }}>Mercedes-Benz <em style={{fontStyle:'italic'}}>G 63 AMG</em></div>
          <div style={{ width: '100%', height: '1px', background: 'rgba(201,197,184,0.5)', marginBottom: '16px' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              ['Year', '2023'],
              ['Engine', '4.0L Biturbo V8'],
              ['Mileage', '12,400 km'],
              ['Price', '₦285,000,000'],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: 'flex', gap: '8px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
              }}>
                <span style={{ color: '#706b5d', minWidth: '64px' }}>{k}</span>
                <span style={{ color: '#a29d8c' }}>—</span>
                <span style={{ color: '#0a0a09' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Hero });
