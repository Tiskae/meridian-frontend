// Meridian Motors — ProcessSection (dark)
// A. Lange & Söhne-inspired dark contrast section

const ProcessSection = () => {
  const steps = [
    { num: '— 01', title: 'Source', body: 'Every vehicle is personally evaluated before it enters our collection. We acquire from verified private sellers, fleet operators, and select international partners. No compromises on provenance.' },
    { num: '— 02', title: 'Inspect', body: 'Independent inspection by certified engineers. Mechanical, electrical, and cosmetic assessments. Full report made available on every vehicle detail page.' },
    { num: '— 03', title: 'Present', body: 'Photographed against clean grounds. Described as it deserves — with precision, without embellishment. Every specification cross-verified before publication.' },
    { num: '— 04', title: 'Deliver', body: 'White-glove handover at our Victoria Island showroom. Documentation, financing, and Lagos registration handled end-to-end, at your pace.' },
  ];

  return (
    <section style={psStyles.section}>
      <div style={psStyles.header}>
        <span style={psStyles.label}>— 02 / The Process</span>
        <span style={psStyles.sub}>How we work</span>
      </div>
      <div style={psStyles.divider}></div>
      <div style={psStyles.grid}>
        {steps.map((s, i) => (
          <div key={i} style={{...psStyles.step, ...(i % 2 === 1 ? psStyles.stepRight : {})}}>
            <div style={psStyles.num}>{s.num}</div>
            <div style={psStyles.title}><em style={{fontStyle:'italic'}}>{s.title}</em></div>
            <div style={psStyles.body}>{s.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const psStyles = {
  section: { padding:'96px 80px', background:'#0a0a09' },
  header: { display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'16px' },
  label: { fontFamily:"'JetBrains Mono',monospace", fontSize:'11px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#a29d8c' },
  sub: { fontFamily:"'JetBrains Mono',monospace", fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#2a2822' },
  divider: { height:'1px', background:'rgba(42,40,34,0.8)', marginBottom:'56px' },
  grid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0' },
  step: { padding:'40px 48px 40px 0', borderTop:'1px solid rgba(42,40,34,0.8)' },
  stepRight: { paddingLeft:'48px', paddingRight:0, borderLeft:'1px solid rgba(42,40,34,0.8)' },
  num: { fontFamily:"'JetBrains Mono',monospace", fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#a29d8c', marginBottom:'12px' },
  title: { fontFamily:"'Instrument Serif',Georgia,serif", fontSize:'32px', color:'#f6f5f2', lineHeight:1.1, marginBottom:'14px' },
  body: { fontFamily:"'Manrope',sans-serif", fontSize:'14px', fontWeight:300, color:'#a29d8c', lineHeight:1.7 },
};

Object.assign(window, { ProcessSection });
