export default function Footer() {
  return (
    <footer>
      <span className="logo" style={{fontSize:'20px'}}>
        <span className="logo-wi">Wi</span><span className="logo-lly">lly</span><span className="logo-hub">hub</span>
      </span>
      <div className="footer-right">
        <span>Hub de soluções para provedores · Comissão recorrente e redução de impostos</span>
        <a
          href="https://www.instagram.com/willyhubsva/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social"
          aria-label="Willy Hub no Instagram"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4.5" />
            <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
