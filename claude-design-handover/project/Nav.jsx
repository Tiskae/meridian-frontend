// Meridian Motors — Nav component
// Sticky top nav: wordmark (left), links (center), CTA (right)

const Nav = ({ currentPage = 'home', onNavigate }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { key: 'inventory', label: 'Inventory' },
    { key: 'about', label: 'About' },
    { key: 'financing', label: 'Financing' },
    { key: 'sell', label: 'Sell Your Car' },
    { key: 'contact', label: 'Contact' },
  ];

  const handleNav = (key) => {
    if (onNavigate) onNavigate(key);
    setMobileOpen(false);
  };

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 64px',
      height: '68px',
      borderBottom: scrolled ? '1px solid rgba(201,197,184,0.5)' : '1px solid rgba(201,197,184,0.2)',
      background: scrolled ? '#fbfaf7' : 'rgba(251,250,247,0.95)',
      backdropFilter: scrolled ? 'none' : 'blur(8px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'border-color 500ms cubic-bezier(0.16,1,0.3,1), background 500ms cubic-bezier(0.16,1,0.3,1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => handleNav('home')}>
        <span style={{ display: 'block', width: '24px', height: '1px', background: '#0a0a09', flexShrink: 0 }}></span>
        <span style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          color: '#0a0a09',
          whiteSpace: 'nowrap',
        }}>MERIDIAN MOTORS</span>
      </div>
      <div style={{ display: 'flex', gap: '32px' }}>
        {links.map(l => (
          <a
            key={l.key}
            onClick={() => handleNav(l.key)}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: currentPage === l.key ? '#0a0a09' : '#3f3c34',
              textDecoration: currentPage === l.key ? 'underline' : 'none',
              textUnderlineOffset: '3px',
              cursor: 'pointer',
              transition: 'color 200ms',
            }}
            onMouseEnter={e => { if (currentPage !== l.key) e.target.style.color = '#0a0a09'; }}
            onMouseLeave={e => { if (currentPage !== l.key) e.target.style.color = '#3f3c34'; }}
          >
            {l.label}
          </a>
        ))}
      </div>
      <a
        href="https://wa.me/2348010000000"
        target="_blank"
        rel="noopener"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          background: '#0a0a09',
          color: '#f6f5f2',
          padding: '11px 20px',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 0,
          textDecoration: 'none',
          transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
      >Enquire on WhatsApp</a>
    </nav>
  );
};

Object.assign(window, { Nav });
