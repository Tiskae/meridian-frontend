// Meridian Motors — FeaturedGrid + Marquee + Testimonial + ClosingCTA

// ─── Brand Marquee ─────────────────────────────────────────────────────────
const Marquee = () => {
  const brands = ['Mercedes-Benz', 'Porsche', 'Range Rover', 'Lexus', 'BMW', 'Rolls-Royce', 'Bentley', 'Lamborghini', 'Ferrari', 'Aston Martin'];
  return (
    <div style={{
      background: '#f6f5f2',
      borderTop: '1px solid rgba(201,197,184,0.4)',
      borderBottom: '1px solid rgba(201,197,184,0.4)',
      overflow: 'hidden',
      padding: '22px 0',
    }}>
      <div style={{
        display: 'flex', gap: '56px',
        animation: 'marqueeScroll 28s linear infinite',
        whiteSpace: 'nowrap',
      }}>
        {[...brands, ...brands, ...brands].map((b, i) => (
          <span key={i} style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '22px',
            color: '#c9c5b8',
            flexShrink: 0,
          }}>{b}</span>
        ))}
      </div>
    </div>
  );
};

// ─── Featured Grid ─────────────────────────────────────────────────────────
const VEHICLES = [
  { id: 1, stamp: '— Featured · 2023', make: 'Mercedes-Benz', model: 'G 63 AMG', price: '₦285,000,000', mileage: '12,400 km', specs: [['Engine','4.0L Biturbo V8'],['Mileage','12,400 km'],['Colour','Obsidian Black']], bg: 'linear-gradient(145deg,#706b5d 0%,#3f3c34 100%)' },
  { id: 2, stamp: '— Now in Showroom · 2022', make: 'Porsche', model: '911 Carrera S', price: '₦195,000,000', mileage: '8,100 km', specs: [['Engine','3.0L Twin-Turbo'],['Mileage','8,100 km'],['Colour','Crayon']], bg: 'linear-gradient(145deg,#3f3c34 0%,#1a1918 100%)' },
  { id: 3, stamp: '— Listed Three Days Ago · 2024', make: 'Range Rover', model: 'Autobiography', price: '₦340,000,000', mileage: '4,200 km', specs: [['Engine','4.4L BMW V8'],['Mileage','4,200 km'],['Colour','Santorini Black']], bg: 'linear-gradient(145deg,#a29d8c 0%,#706b5d 100%)' },
];

const FeaturedGrid = ({ onViewVehicle }) => {
  const [hoveredId, setHoveredId] = React.useState(null);
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '100px 80px 80px', background: '#f6f5f2' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 800ms cubic-bezier(0.16,1,0.3,1)',
      }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#706b5d' }}>— 01 / Featured Vehicles</span>
        <a style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0a0a09', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}>View the Collection</a>
      </div>
      <div style={{ height: '1px', background: 'rgba(201,197,184,0.5)', marginBottom: '40px' }}></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px' }}>
        {VEHICLES.map((v, i) => (
          <div
            key={v.id}
            style={{
              cursor: 'pointer',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: `all 800ms cubic-bezier(0.16,1,0.3,1) ${200 + i * 120}ms`,
            }}
            onClick={() => onViewVehicle && onViewVehicle(v)}
            onMouseEnter={() => setHoveredId(v.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div style={{
              width: '100%', height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '16px', background: v.bg, overflow: 'hidden', position: 'relative',
              transform: hoveredId === v.id ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
            }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(246,245,242,0.3)' }}>Photography</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#706b5d', marginBottom: '6px' }}>{v.stamp}</div>
            <div style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: '22px', color: '#0a0a09', lineHeight: 1.15, marginBottom: '4px' }}>{v.make} <em style={{fontStyle:'italic'}}>{v.model}</em></div>
            <div style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: '17px', color: '#3f3c34', marginBottom: '14px' }}>{v.price}</div>
            <div style={{ height: '1px', background: 'rgba(201,197,184,0.5)', marginBottom: '12px' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {v.specs.map(([k, val]) => (
                <div key={k} style={{ display: 'flex', gap: '8px', fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  <span style={{ color: '#706b5d', minWidth: '68px' }}>{k}</span>
                  <span style={{ color: '#a29d8c' }}>—</span>
                  <span style={{ color: '#0a0a09' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Process Section (dark) ────────────────────────────────────────────────
const ProcessSection = () => {
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const steps = [
    { num: '— 01', title: 'Source', body: 'Every vehicle is personally evaluated before it enters our collection. We acquire from verified private sellers, fleet operators, and select international partners.' },
    { num: '— 02', title: 'Inspect', body: 'Independent inspection by certified engineers. Mechanical, electrical, and cosmetic assessments. Full report made available on every vehicle detail page.' },
    { num: '— 03', title: 'Present', body: 'Photographed against clean grounds. Described with precision, without embellishment. Every specification cross-verified before publication.' },
    { num: '— 04', title: 'Deliver', body: 'White-glove handover at our showroom. Documentation, financing, and Lagos registration handled end-to-end, at your pace.' },
  ];

  return (
    <section ref={sectionRef} style={{ padding: '96px 80px', background: '#0a0a09' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 800ms cubic-bezier(0.16,1,0.3,1)',
      }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a29d8c' }}>— 02 / The Process</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(42,40,34,0.8)' }}>How we work</span>
      </div>
      <div style={{ height: '1px', background: 'rgba(42,40,34,0.8)', marginBottom: '56px' }}></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            padding: i % 2 === 0 ? '40px 48px 40px 0' : '40px 0 40px 48px',
            borderTop: '1px solid rgba(42,40,34,0.8)',
            borderLeft: i % 2 === 1 ? '1px solid rgba(42,40,34,0.8)' : 'none',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: `all 800ms cubic-bezier(0.16,1,0.3,1) ${200 + i * 150}ms`,
          }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a29d8c', marginBottom: '12px' }}>{s.num}</div>
            <div style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: '32px', color: '#f6f5f2', lineHeight: 1.1, marginBottom: '14px' }}><em style={{fontStyle:'italic'}}>{s.title}</em></div>
            <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: '14px', fontWeight: 300, color: '#a29d8c', lineHeight: 1.7 }}>{s.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Testimonial (light) ───────────────────────────────────────────────────
const Testimonial = () => {
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '120px 80px', background: '#f6f5f2', textAlign: 'center' }}>
      <div style={{
        fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#706b5d', marginBottom: '32px',
        opacity: visible ? 1 : 0, transition: 'opacity 800ms cubic-bezier(0.16,1,0.3,1)',
      }}>— Client</div>
      <blockquote style={{
        fontFamily: "'Instrument Serif',Georgia,serif",
        fontSize: 'clamp(28px,4vw,52px)',
        fontWeight: 400,
        color: '#0a0a09',
        lineHeight: 1.15,
        letterSpacing: '-0.01em',
        marginBottom: '24px',
        fontStyle: 'normal',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 800ms cubic-bezier(0.16,1,0.3,1) 150ms',
      }}>
        "The only dealership in Lagos that treats the car
        as something worth <em style={{fontStyle:'italic'}}>contemplating</em>."
      </blockquote>
      <div style={{
        fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a29d8c',
        opacity: visible ? 1 : 0, transition: 'opacity 800ms cubic-bezier(0.16,1,0.3,1) 300ms',
      }}>— Adebayo O., Victoria Island · Added 14 March 2026</div>
    </section>
  );
};

// ─── Closing CTA (dark) ────────────────────────────────────────────────────
const ClosingCTA = () => {
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{
      background: '#0a0a09', padding: '120px 80px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
    }}>
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 800ms cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a29d8c', marginBottom: '20px' }}>By Appointment</div>
        <h2 style={{
          fontFamily: "'Instrument Serif',Georgia,serif",
          fontSize: 'clamp(36px,5vw,64px)',
          color: '#f6f5f2', lineHeight: 1.08, letterSpacing: '-0.02em', maxWidth: '520px',
        }}>
          Visit us. See the cars<br />as they deserve to be <em style={{fontStyle:'italic'}}>seen</em>.
        </h2>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 800ms cubic-bezier(0.16,1,0.3,1) 200ms',
      }}>
        <button
          style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
            background: '#f6f5f2', color: '#0a0a09', padding: '14px 28px', border: 'none', cursor: 'pointer', borderRadius: 0,
            transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >Book a Private Viewing</button>
        <a
          href="https://wa.me/2348010000000"
          target="_blank"
          rel="noopener"
          style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
            background: 'transparent', color: '#f6f5f2', padding: '14px 28px',
            border: '1px solid rgba(246,245,242,0.3)', cursor: 'pointer', borderRadius: 0,
            textDecoration: 'none', display: 'inline-block',
            transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >Enquire on WhatsApp</a>
      </div>
    </section>
  );
};

// ─── Footer ────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: '#0a0a09', padding: '72px 80px 40px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', marginBottom: '56px' }}>
      <div style={{ flex: '0 0 200px' }}>
        <div style={{ width: '24px', height: '1px', background: '#f6f5f2', marginBottom: '14px' }}></div>
        <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: '13px', fontWeight: 600, letterSpacing: '0.12em', color: '#f6f5f2', marginBottom: '6px' }}>MERIDIAN MOTORS</div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a29d8c' }}>Est. 2018 · Lagos, Nigeria</div>
      </div>
      <div style={{ display: 'flex', gap: '64px' }}>
        {[
          { heading: 'Showroom', items: ['No. 4 Kofo Abayomi St', 'Victoria Island, Lagos', 'Mon – Sat, 9am – 6pm', 'By Appointment'] },
          { heading: 'Collection', items: ['Inventory', 'Vehicle Detail', 'Financing', 'Sell Your Car'] },
          { heading: 'Contact', items: ['Enquire on WhatsApp', '+234 801 000 0000', 'hello@meridianmotors.ng', 'Book a Private Viewing'] },
        ].map(col => (
          <div key={col.heading} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a29d8c', marginBottom: '4px', paddingBottom: '8px', borderBottom: '1px solid rgba(42,40,34,0.8)' }}>{col.heading}</div>
            {col.items.map(item => <div key={item} style={{ fontFamily: "'Manrope',sans-serif", fontSize: '13px', fontWeight: 300, color: '#c9c5b8', lineHeight: 1.5, cursor: 'pointer' }}>{item}</div>)}
          </div>
        ))}
      </div>
    </div>
    <div style={{ height: '1px', background: 'rgba(42,40,34,0.8)', marginBottom: '24px' }}></div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a29d8c' }}>Vol. 01 — Spring 2026</span>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a29d8c' }}>© 2026 Meridian Motors. All rights reserved.</span>
    </div>
  </footer>
);

Object.assign(window, { Marquee, FeaturedGrid, ProcessSection, Testimonial, ClosingCTA, Footer, VEHICLES });
