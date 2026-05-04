// Meridian Motors — Vehicle Detail Page
// Digital showroom: asymmetric gallery, sticky CTA rail, spec grid

const VehicleDetail = ({ vehicle, onBack }) => {
  const [visible, setVisible] = React.useState(false);
  const [activeImg, setActiveImg] = React.useState(0);

  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  const galleryImages = [
    { label: 'Primary Photography', bg: vehicle.bg },
    { label: 'Interior', bg: 'linear-gradient(160deg,#a29d8c,#706b5d)' },
    { label: 'Detail', bg: 'linear-gradient(160deg,#706b5d,#3f3c34)' },
    { label: 'Engine Bay', bg: 'linear-gradient(160deg,#3f3c34,#1a1918)' },
    { label: 'Rear Quarter', bg: 'linear-gradient(160deg,#1a1918,#0a0a09)' },
  ];

  const specs = [
    ['Make', vehicle.make],
    ['Model', vehicle.model],
    ['Year', String(vehicle.year || '2023')],
    ['Engine', '4.0L Biturbo V8'],
    ['Power', '585 bhp'],
    ['Transmission', '9-Speed AMG Speedshift'],
    ['Mileage', vehicle.mileage || '12,400 km'],
    ['Colour', 'Obsidian Black Metallic'],
    ['Condition', 'Pre-owned, Excellent'],
    ['Stock No.', 'MM-2024-00' + vehicle.id],
  ];

  const features = [
    'AMG Performance Exhaust', 'Burmester Surround Sound', 'Adaptive Damping',
    'Head-Up Display', 'Night Vision Assist', '360° Camera System',
    'Heated & Ventilated Seats', 'Soft-Close Doors', 'AMG Carbon Fibre Trim',
    'Keyless Go', 'Active Parking Assist', 'Multibeam LED Headlights',
  ];

  const mono = {
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
  };

  const revealStyle = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 800ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 800ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <div style={{ background: '#f6f5f2', minHeight: '100vh' }}>
      {/* Back link */}
      <div style={{ padding: '16px 80px 0', ...revealStyle(0) }}>
        <span
          onClick={onBack}
          style={{ ...mono, fontSize: '10px', color: '#706b5d', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >← Back to Collection</span>
      </div>

      {/* Header strip */}
      <div style={{
        padding: '24px 80px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        ...revealStyle(100),
      }}>
        <div>
          <div style={{ ...mono, fontSize: '10px', color: '#706b5d', marginBottom: '8px' }}>
            Stock No. MM-2024-00{vehicle.id} · Pre-owned
          </div>
          <h1 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(32px, 4vw, 56px)',
            color: '#0a0a09', lineHeight: 1.05, letterSpacing: '-0.02em',
          }}>
            {vehicle.make} <em style={{fontStyle:'italic'}}>{vehicle.model}</em>
          </h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ ...mono, fontSize: '9px', color: '#706b5d', marginBottom: '4px' }}>Price</div>
          <div style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: '28px', color: '#0a0a09',
          }}>{vehicle.priceLabel || vehicle.price}</div>
        </div>
      </div>

      {/* Asymmetric image gallery — RM Sotheby's inspired */}
      <div style={{
        padding: '32px 80px',
        ...revealStyle(200),
      }}>
        {/* Main image */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gridTemplateRows: '340px 170px',
          gap: '6px',
        }}>
          <div
            style={{
              background: galleryImages[activeImg].bg,
              gridRow: '1 / 3',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 1200ms cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <span style={{ ...mono, fontSize: '9px', color: 'rgba(246,245,242,0.3)' }}>{galleryImages[activeImg].label}</span>
          </div>
          <div
            style={{
              background: galleryImages[1].bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              border: activeImg === 1 ? '1px solid #0a0a09' : '1px solid transparent',
            }}
            onClick={() => setActiveImg(1)}
          >
            <span style={{ ...mono, fontSize: '9px', color: 'rgba(246,245,242,0.3)' }}>Interior</span>
          </div>
          <div
            style={{
              background: galleryImages[2].bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              border: activeImg === 2 ? '1px solid #0a0a09' : '1px solid transparent',
            }}
            onClick={() => setActiveImg(2)}
          >
            <span style={{ ...mono, fontSize: '9px', color: 'rgba(246,245,242,0.3)' }}>Detail</span>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
          {galleryImages.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImg(i)}
              style={{
                flex: 1, height: '56px',
                background: img.bg,
                cursor: 'pointer',
                border: activeImg === i ? '1px solid #0a0a09' : '1px solid transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 200ms',
              }}
            >
              <span style={{ ...mono, fontSize: '7px', color: 'rgba(246,245,242,0.25)' }}>{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main content — specs + sticky CTA rail */}
      <div style={{
        padding: '0 80px 100px',
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: '64px',
        alignItems: 'start',
      }}>
        <div style={revealStyle(300)}>
          {/* Highlight blockquote */}
          <blockquote style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: '22px', fontStyle: 'italic', color: '#3f3c34',
            lineHeight: 1.4, margin: '40px 0',
            paddingLeft: '24px',
            borderLeft: '1px solid rgba(201,197,184,0.5)',
          }}>
            "The G-Class defines the category it created. This example — finished in Obsidian Black, with the full AMG package — is presented in genuinely exceptional order."
          </blockquote>

          {/* Specifications */}
          <div style={{ ...mono, fontSize: '10px', color: '#706b5d', marginBottom: '16px', letterSpacing: '0.2em' }}>— Specifications</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {specs.map(([k, v]) => (
              <div key={k} style={{
                display: 'flex', gap: '12px', padding: '11px 0',
                borderBottom: '1px solid rgba(201,197,184,0.4)', alignItems: 'baseline',
              }}>
                <span style={{ ...mono, fontSize: '10px', color: '#706b5d', minWidth: '130px' }}>{k}</span>
                <span style={{ ...mono, fontSize: '10px', color: '#a29d8c' }}>—</span>
                <span style={{ ...mono, fontSize: '10px', color: '#0a0a09', letterSpacing: '0.12em' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Features */}
          <div style={{ ...mono, fontSize: '10px', color: '#706b5d', marginTop: '48px', marginBottom: '16px', letterSpacing: '0.2em' }}>— Features & Equipment</div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0',
          }}>
            {features.map((f, i) => (
              <div key={f} style={{
                padding: '10px 0',
                borderBottom: '1px solid rgba(201,197,184,0.4)',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '14px', fontWeight: 300, color: '#3f3c34',
                paddingRight: i % 2 === 0 ? '24px' : '0',
                paddingLeft: i % 2 === 1 ? '24px' : '0',
                borderLeft: i % 2 === 1 ? '1px solid rgba(201,197,184,0.4)' : 'none',
              }}>{f}</div>
            ))}
          </div>
        </div>

        {/* Sticky CTA rail */}
        <div style={{
          position: 'sticky', top: '88px',
          display: 'flex', flexDirection: 'column', gap: '12px',
          paddingTop: '40px',
          ...revealStyle(400),
        }}>
          <a
            href="https://wa.me/2348010000000"
            target="_blank"
            rel="noopener"
            style={{
              ...mono, fontSize: '11px', letterSpacing: '0.2em',
              background: '#0a0a09', color: '#f6f5f2',
              padding: '15px', border: 'none', cursor: 'pointer', borderRadius: 0,
              textDecoration: 'none', textAlign: 'center',
              transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
              display: 'block',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >Enquire on WhatsApp</a>
          <button
            style={{
              ...mono, fontSize: '11px', letterSpacing: '0.2em',
              background: 'transparent', color: '#0a0a09',
              padding: '15px', border: '1px solid #0a0a09', cursor: 'pointer', borderRadius: 0,
              transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)', width: '100%',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >Book a Test Drive</button>
          <button
            style={{
              ...mono, fontSize: '11px', letterSpacing: '0.2em',
              background: 'transparent', color: '#0a0a09',
              padding: '15px', border: '1px solid #0a0a09', cursor: 'pointer', borderRadius: 0,
              transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)', width: '100%',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >Request Inspection Report</button>

          <div style={{ height: '1px', background: 'rgba(201,197,184,0.4)', margin: '8px 0' }}></div>

          <div style={{ ...mono, fontSize: '9px', color: '#706b5d', lineHeight: 1.8 }}>
            {vehicle.listed || 'Listed fourteen days ago'}<br />
            By appointment at our showroom<br />
            No. 4 Kofo Abayomi St, V.I.
          </div>

          {/* Finance estimator teaser */}
          <div style={{
            marginTop: '16px',
            borderTop: '1px solid rgba(201,197,184,0.4)',
            paddingTop: '20px',
          }}>
            <div style={{ ...mono, fontSize: '9px', color: '#706b5d', marginBottom: '10px', letterSpacing: '0.2em' }}>— Finance Estimate</div>
            <div style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: '20px', color: '#0a0a09', marginBottom: '4px',
            }}>From ₦4.2M / month</div>
            <div style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '12px', fontWeight: 300, color: '#706b5d', lineHeight: 1.5,
              marginBottom: '12px',
            }}>
              48 months · 20% deposit · subject to approval
            </div>
            <button
              style={{
                ...mono, fontSize: '9px', letterSpacing: '0.2em',
                background: 'transparent', color: '#3f3c34',
                padding: '10px 14px', border: '1px solid rgba(201,197,184,0.6)', cursor: 'pointer', borderRadius: 0,
                width: '100%',
                transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >View Financing Options</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { VehicleDetail });
