// Meridian Motors — Testimonial + Footer

const Testimonial = () => (
  <section style={tStyles.section}>
    <div style={tStyles.label}>— Client</div>
    <blockquote style={tStyles.quote}>
      "The only dealership in Lagos that treats the car<br />
      as something worth <em style={{fontStyle:'italic'}}>contemplating</em>."
    </blockquote>
    <div style={tStyles.attr}>— Adebayo O., Victoria Island · Added 14 March 2026</div>
  </section>
);

const Footer = () => (
  <footer style={ftStyles.footer}>
    <div style={ftStyles.top}>
      <div style={ftStyles.brand}>
        <div style={ftStyles.rule}></div>
        <div style={ftStyles.wordmark}>MERIDIAN MOTORS</div>
        <div style={ftStyles.sub}>Est. 2018 · Lagos, Nigeria</div>
      </div>
      <div style={ftStyles.cols}>
        {[
          { heading: 'Showroom', items: ['No. 4 Kofo Abayomi St', 'Victoria Island, Lagos', 'Mon – Sat, 9am – 6pm', 'By Appointment'] },
          { heading: 'Collection', items: ['Inventory', 'Vehicle Detail', 'Financing', 'Sell Your Car'] },
          { heading: 'Contact', items: ['Enquire on WhatsApp', '+234 801 000 0000', 'hello@meridianmotors.ng', 'Book a Private Viewing'] },
        ].map(col => (
          <div key={col.heading} style={ftStyles.col}>
            <div style={ftStyles.colHead}>{col.heading}</div>
            {col.items.map(item => <div key={item} style={ftStyles.colItem}>{item}</div>)}
          </div>
        ))}
      </div>
    </div>
    <div style={ftStyles.divider}></div>
    <div style={ftStyles.bottom}>
      <span style={ftStyles.copy}>Vol. 01 — Spring 2026</span>
      <span style={ftStyles.copy}>© 2026 Meridian Motors. All rights reserved.</span>
    </div>
  </footer>
);

const tStyles = {
  section: { padding:'120px 80px', background:'#f6f5f2', textAlign:'center' },
  label: { fontFamily:"'JetBrains Mono',monospace", fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#706b5d', marginBottom:'32px' },
  quote: { fontFamily:"'Instrument Serif',Georgia,serif", fontSize:'clamp(28px,4vw,52px)', fontWeight:400, color:'#0a0a09', lineHeight:1.15, letterSpacing:'-0.01em', marginBottom:'24px', fontStyle:'normal' },
  attr: { fontFamily:"'JetBrains Mono',monospace", fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#a29d8c' },
};

const ftStyles = {
  footer: { background:'#0a0a09', padding:'72px 80px 40px' },
  top: { display:'flex', justifyContent:'space-between', gap:'40px', marginBottom:'56px' },
  brand: { flex:'0 0 200px' },
  rule: { width:'24px', height:'1px', background:'#f6f5f2', marginBottom:'14px' },
  wordmark: { fontFamily:"'Manrope',sans-serif", fontSize:'13px', fontWeight:600, letterSpacing:'0.12em', color:'#f6f5f2', marginBottom:'6px' },
  sub: { fontFamily:"'JetBrains Mono',monospace", fontSize:'9px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#a29d8c' },
  cols: { display:'flex', gap:'64px' },
  col: { display:'flex', flexDirection:'column', gap:'10px' },
  colHead: { fontFamily:"'JetBrains Mono',monospace", fontSize:'9px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#a29d8c', marginBottom:'4px', paddingBottom:'8px', borderBottom:'1px solid rgba(42,40,34,0.8)' },
  colItem: { fontFamily:"'Manrope',sans-serif", fontSize:'13px', fontWeight:300, color:'#c9c5b8', lineHeight:1.5 },
  divider: { height:'1px', background:'rgba(42,40,34,0.8)', marginBottom:'24px' },
  bottom: { display:'flex', justifyContent:'space-between' },
  copy: { fontFamily:"'JetBrains Mono',monospace", fontSize:'9px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#a29d8c' },
};

Object.assign(window, { Testimonial, Footer });
