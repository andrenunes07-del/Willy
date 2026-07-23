export default function Footer() {
  return (
    <footer>
      <span className="logo" style={{fontSize:'20px'}}>
        <span className="logo-wi">Wi</span><span className="logo-lly">lly</span><span className="logo-hub">hub</span>
      </span>
      <div className="footer-right">
        <span>Hub de soluções para provedores · Comissão recorrente e redução de impostos</span>
        <a
          href="https://wa.me/554230101116"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social footer-wa"
          aria-label="WhatsApp Willyhub"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.847L.057 23.882a.5.5 0 0 0 .611.61l6.109-1.605A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.031-1.371l-.361-.214-3.735.981.997-3.648-.235-.374A9.861 9.861 0 0 1 2.1 12c0-5.468 4.432-9.9 9.9-9.9 5.469 0 9.9 4.432 9.9 9.9 0 5.469-4.431 9.9-9.9 9.9z"/></svg>
        </a>
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
