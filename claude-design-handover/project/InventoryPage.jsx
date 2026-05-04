// Meridian Motors — Inventory Page
// Sticky filter bar, 3-col grid, functional filters, pagination

const INVENTORY = [
  { id: 1, year: 2023, body: 'SUV', make: 'Mercedes-Benz', model: 'G 63 AMG', price: 285000000, priceLabel: '₦285,000,000', mileage: '12,400 km', listed: 'Listed fourteen days ago', bg: 'linear-gradient(145deg,#706b5d 0%,#3f3c34 100%)' },
  { id: 2, year: 2022, body: 'Coupé', make: 'Porsche', model: '911 Carrera S', price: 195000000, priceLabel: '₦195,000,000', mileage: '8,100 km', listed: 'Listed three days ago', bg: 'linear-gradient(145deg,#3f3c34 0%,#1a1918 100%)' },
  { id: 3, year: 2024, body: 'SUV', make: 'Range Rover', model: 'Autobiography', price: 340000000, priceLabel: '₦340,000,000', mileage: '4,200 km', listed: 'Listed seven days ago', bg: 'linear-gradient(145deg,#a29d8c 0%,#706b5d 100%)' },
  { id: 4, year: 2023, body: 'SUV', make: 'Lexus', model: 'LX 600 F-Sport', price: 210000000, priceLabel: '₦210,000,000', mileage: '6,800 km', listed: 'Listed ten days ago', bg: 'linear-gradient(145deg,#706b5d 0%,#a29d8c 100%)' },
  { id: 5, year: 2021, body: 'Saloon', make: 'BMW', model: 'M5 Competition', price: 165000000, priceLabel: '₦165,000,000', mileage: '19,200 km', listed: 'Listed twenty-one days ago', bg: 'linear-gradient(145deg,#3f3c34 0%,#706b5d 100%)' },
  { id: 6, year: 2022, body: 'Saloon', make: 'Mercedes-Benz', model: 'S 580 AMG Line', price: 245000000, priceLabel: '₦245,000,000', mileage: '11,000 km', listed: 'Listed five days ago', bg: 'linear-gradient(145deg,#1a1918 0%,#3f3c34 100%)' },
  { id: 7, year: 2023, body: 'SUV', make: 'Rolls-Royce', model: 'Cullinan Black Badge', price: 520000000, priceLabel: '₦520,000,000', mileage: '3,100 km', listed: 'Listed two days ago', bg: 'linear-gradient(145deg,#0a0a09 0%,#3f3c34 100%)' },
  { id: 8, year: 2024, body: 'Coupé', make: 'Bentley', model: 'Continental GT', price: 385000000, priceLabel: '₦385,000,000', mileage: '1,800 km', listed: 'Listed four days ago', bg: 'linear-gradient(145deg,#a29d8c 0%,#3f3c34 100%)' },
  { id: 9, year: 2022, body: 'Convertible', make: 'Ferrari', model: '296 GTS', price: 450000000, priceLabel: '₦450,000,000', mileage: '5,600 km', listed: 'Listed twelve days ago', bg: 'linear-gradient(145deg,#3f3c34 0%,#a29d8c 100%)' },
];

const InventoryPage = ({ onViewVehicle }) => {
  const [activeBody, setActiveBody] = React.useState('All');
  const [activeMake, setActiveMake] = React.useState('All');
  const [sort, setSort] = React.useState('newest');
  const [hoveredId, setHoveredId] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const gridRef = React.useRef(null);

  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const bodyTypes = ['All', 'SUV', 'Saloon', 'Coupé', 'Convertible'];
  const makes = ['All', ...Array.from(new Set(INVENTORY.map(v => v.make))).sort()];

  let filtered = INVENTORY.filter(v =>
    (activeBody === 'All' || v.body === activeBody) &&
    (activeMake === 'All' || v.make === activeMake)
  );

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === 'newest') filtered = [...filtered].sort((a, b) => b.year - a.year);
  else if (sort === 'mileage') filtered = [...filtered].sort((a, b) => parseInt(a.mileage.replace(/\D/g,'')) - parseInt(b.mileage.replace(/\D/g,'')));

  const mono = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '9px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
  };

  const pillStyle = (active) => ({
    ...mono,
    padding: '7px 14px',
    background: active ? '#0a0a09' : 'transparent',
    color: active ? '#f6f5f2' : '#3f3c34',
    border: active ? '1px solid #0a0a09' : '1px solid rgba(201,197,184,0.6)',
    cursor: 'pointer',
    borderRadius: 0,
    transition: 'all 200ms cubic-bezier(0.16,1,0.3,1)',
  });

  return (
    <div style={{ background: '#f6f5f2', minHeight: '100vh' }}>
      {/* Page header */}
      <div style={{
        padding: '48px 80px 0',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 800ms cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ ...mono, color: '#706b5d', marginBottom: '16px', fontSize: '10px', letterSpacing: '0.2em' }}>— The Collection</div>
        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 400, lineHeight: 1.08, letterSpacing: '-0.02em',
          color: '#0a0a09', marginBottom: '12px',
        }}>Every car, <em style={{fontStyle:'italic'}}>considered</em>.</h1>
        <p style={{
          fontFamily: "'Manrope', sans-serif", fontSize: '15px', fontWeight: 300,
          color: '#3f3c34', lineHeight: 1.6, maxWidth: '420px', marginBottom: '0',
        }}>Sourced with intention. Inspected without compromise. Presented as they deserve.</p>
      </div>

      {/* Sticky filter bar */}
      <div style={{
        position: 'sticky', top: 68, zIndex: 50,
        background: '#fbfaf7',
        borderBottom: '1px solid rgba(201,197,184,0.5)',
        borderTop: '1px solid rgba(201,197,184,0.5)',
        padding: '14px 80px',
        display: 'flex', alignItems: 'center', gap: '0',
        marginTop: '32px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ ...mono, color: '#a29d8c', fontSize: '9px' }}>Body</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {bodyTypes.map(t => (
              <button key={t} style={pillStyle(activeBody === t)} onClick={() => setActiveBody(t)}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ width: '1px', height: '24px', background: 'rgba(201,197,184,0.5)', margin: '0 20px' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ ...mono, color: '#a29d8c', fontSize: '9px' }}>Make</span>
          <select
            value={activeMake}
            onChange={e => setActiveMake(e.target.value)}
            style={{
              ...mono,
              fontSize: '9px',
              color: activeMake === 'All' ? '#3f3c34' : '#f6f5f2',
              background: activeMake === 'All' ? 'transparent' : '#0a0a09',
              border: activeMake === 'All' ? '1px solid rgba(201,197,184,0.6)' : '1px solid #0a0a09',
              padding: '7px 14px',
              cursor: 'pointer',
              borderRadius: 0,
              appearance: 'none',
              WebkitAppearance: 'none',
              minWidth: '120px',
            }}
          >
            {makes.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ ...mono, color: '#a29d8c', fontSize: '9px' }}>Sort</span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              ...mono,
              fontSize: '9px',
              color: '#0a0a09',
              background: 'transparent',
              border: '1px solid rgba(201,197,184,0.6)',
              padding: '6px 10px',
              cursor: 'pointer',
              borderRadius: 0,
              appearance: 'none',
              WebkitAppearance: 'none',
            }}
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price — Low to High</option>
            <option value="price-desc">Price — High to Low</option>
            <option value="mileage">Lowest Mileage</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div style={{ padding: '20px 80px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ ...mono, color: '#706b5d', fontSize: '10px' }}>{filtered.length} vehicle{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Grid */}
      <div ref={gridRef} style={{ padding: '24px 80px 80px' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '80px 0', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '28px', color: '#3f3c34', marginBottom: '12px' }}>No vehicles match your criteria.</div>
            <div style={{ ...mono, color: '#a29d8c', fontSize: '10px' }}>Try adjusting your filters.</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '64px' }}>
            {filtered.map((v, i) => (
              <div
                key={v.id}
                style={{
                  cursor: 'pointer',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `all 800ms cubic-bezier(0.16,1,0.3,1) ${100 + i * 80}ms`,
                }}
                onClick={() => onViewVehicle && onViewVehicle(v)}
                onMouseEnter={() => setHoveredId(v.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div style={{
                  width: '100%', height: '240px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '14px', background: v.bg,
                  transform: hoveredId === v.id ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
                }}>
                  <span style={{ ...mono, fontSize: '9px', color: 'rgba(246,245,242,0.3)' }}>Photography</span>
                </div>
                <div style={{ ...mono, color: '#706b5d', marginBottom: '5px', fontSize: '9px' }}>{v.year} · {v.body}</div>
                <div style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: '21px', color: '#0a0a09', lineHeight: 1.15, marginBottom: '4px',
                }}>{v.make} <em style={{fontStyle:'italic'}}>{v.model}</em></div>
                <div style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: '16px', color: '#3f3c34', marginBottom: '12px',
                }}>{v.priceLabel}</div>
                <div style={{ height: '1px', background: 'rgba(201,197,184,0.5)', marginBottom: '10px' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ display: 'flex', gap: '6px', ...mono, fontSize: '9px' }}>
                    <span style={{ color: '#706b5d' }}>Mileage</span>
                    <span style={{ color: '#a29d8c' }}>—</span>
                    <span style={{ color: '#0a0a09' }}>{v.mileage}</span>
                  </div>
                  <span style={{ ...mono, fontSize: '8px', color: '#a29d8c' }}>{v.listed}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderTop: '1px solid rgba(201,197,184,0.4)',
          }}>
            {[1, 2, 3].map(n => (
              <span key={n} style={{
                ...mono,
                fontSize: '10px',
                padding: '12px 18px',
                cursor: 'pointer',
                color: n === 1 ? '#0a0a09' : '#706b5d',
                textDecoration: n === 1 ? 'underline' : 'none',
                textUnderlineOffset: '3px',
                borderRight: '1px solid rgba(201,197,184,0.4)',
              }}>{String(n).padStart(2, '0')}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { InventoryPage, INVENTORY });
