// Meridian Motors — FeaturedGrid component
// 3-column vehicle grid on light canvas

const FeaturedGrid = ({ onViewVehicle }) => {
  const vehicles = [
    { id: 1, stamp: '— Featured · 2023', make: 'Mercedes-Benz', model: 'G 63 AMG', price: '₦285,000,000', specs: [['Engine','4.0L Biturbo V8'],['Mileage','12,400 km'],['Colour','Obsidian Black']], bg: 'linear-gradient(135deg,#706b5d,#3f3c34)' },
    { id: 2, stamp: '— Now in Showroom · 2022', make: 'Porsche', model: '911 Carrera S', price: '₦195,000,000', specs: [['Engine','3.0L Twin-Turbo'],['Mileage','8,100 km'],['Colour','Crayon']], bg: 'linear-gradient(135deg,#3f3c34,#0a0a09)' },
    { id: 3, stamp: '— Listed Three Days Ago · 2024', make: 'Range Rover', model: 'Autobiography', price: '₦340,000,000', specs: [['Engine','4.4L BMW V8'],['Mileage','4,200 km'],['Colour','Santorini Black']], bg: 'linear-gradient(135deg,#a29d8c,#706b5d)' },
  ];

  return (
    <section style={fgStyles.section}>
      <div style={fgStyles.header}>
        <span style={fgStyles.label}>— 01 / Featured Vehicles</span>
        <a style={fgStyles.viewAll}>View the Collection</a>
      </div>
      <div style={fgStyles.divider}></div>
      <div style={fgStyles.grid}>
        {vehicles.map(v => (
          <div key={v.id} style={fgStyles.card} onClick={() => onViewVehicle && onViewVehicle(v)}>
            <div style={{...fgStyles.img, background: v.bg}}>
              <span style={fgStyles.imgLabel}>Photography</span>
            </div>
            <div style={fgStyles.meta}>
              <div style={fgStyles.stamp}>{v.stamp}</div>
              <div style={fgStyles.make}>{v.make} <em style={{fontStyle:'italic'}}>{v.model}</em></div>
              <div style={fgStyles.price}>{v.price}</div>
              <div style={fgStyles.specsDivider}></div>
              <div style={fgStyles.specs}>
                {v.specs.map(([k, val]) => (
                  <div key={k} style={fgStyles.specRow}>
                    <span style={fgStyles.specKey}>{k}</span>
                    <span style={fgStyles.specSep}>—</span>
                    <span style={fgStyles.specVal}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const fgStyles = {
  section: { padding: '80px 80px', background: '#f6f5f2' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' },
  label: { fontFamily:"'JetBrains Mono',monospace", fontSize:'11px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#706b5d' },
  viewAll: { fontFamily:"'JetBrains Mono',monospace", fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#0a0a09', cursor:'pointer', textDecoration:'underline', textUnderlineOffset:'3px' },
  divider: { height:'1px', background:'rgba(201,197,184,0.5)', marginBottom:'40px' },
  grid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'32px' },
  card: { cursor:'pointer' },
  img: { width:'100%', height:'240px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px' },
  imgLabel: { fontFamily:"'JetBrains Mono',monospace", fontSize:'9px', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(246,245,242,0.4)' },
  meta: {},
  stamp: { fontFamily:"'JetBrains Mono',monospace", fontSize:'9px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#706b5d', marginBottom:'6px' },
  make: { fontFamily:"'Instrument Serif',Georgia,serif", fontSize:'22px', color:'#0a0a09', lineHeight:1.15, marginBottom:'4px' },
  price: { fontFamily:"'Instrument Serif',Georgia,serif", fontSize:'17px', color:'#3f3c34', marginBottom:'14px' },
  specsDivider: { height:'1px', background:'rgba(201,197,184,0.5)', marginBottom:'12px' },
  specs: { display:'flex', flexDirection:'column', gap:'5px' },
  specRow: { display:'flex', gap:'8px', fontFamily:"'JetBrains Mono',monospace", fontSize:'9px', letterSpacing:'0.14em', textTransform:'uppercase' },
  specKey: { color:'#706b5d', minWidth:'68px' },
  specSep: { color:'#a29d8c' },
  specVal: { color:'#0a0a09' },
};

Object.assign(window, { FeaturedGrid });
