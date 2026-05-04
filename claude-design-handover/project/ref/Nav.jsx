// Meridian Motors — Nav component
// Sticky top nav: wordmark (left), links (center), CTA (right)

const Nav = ({ currentPage = 'home' }) => {
  const links = [
    { key: 'inventory', label: 'Inventory' },
    { key: 'about', label: 'About' },
    { key: 'financing', label: 'Financing' },
    { key: 'sell', label: 'Sell Your Car' },
    { key: 'contact', label: 'Contact' },
  ];

  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.wordmarkWrap}>
        <span style={navStyles.rule}></span>
        <span style={navStyles.wordmark}>MERIDIAN MOTORS</span>
      </div>
      <div style={navStyles.links}>
        {links.map(l => (
          <a
            key={l.key}
            style={{
              ...navStyles.link,
              ...(currentPage === l.key ? navStyles.linkActive : {}),
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
      <button style={navStyles.cta}>Enquire on WhatsApp</button>
    </nav>
  );
};

const navStyles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 64px',
    height: '68px',
    borderBottom: '1px solid rgba(201,197,184,0.5)',
    background: '#fbfaf7',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  wordmarkWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  rule: {
    display: 'block',
    width: '24px',
    height: '1px',
    background: '#0a0a09',
    flexShrink: 0,
  },
  wordmark: {
    fontFamily: "'Manrope', sans-serif",
    fontSize: '13px',
    fontWeight: 600,
    letterSpacing: '0.12em',
    color: '#0a0a09',
    whiteSpace: 'nowrap',
  },
  links: {
    display: 'flex',
    gap: '32px',
  },
  link: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#3f3c34',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 200ms',
  },
  linkActive: {
    color: '#0a0a09',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
  cta: {
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
    transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
    whiteSpace: 'nowrap',
  },
};

Object.assign(window, { Nav });
