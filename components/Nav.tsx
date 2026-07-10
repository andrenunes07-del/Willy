'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CTA_BY_ROUTE: Record<string, { label: string; target: string }> = {
  '/ebook': { label: 'Simular economia →', target: 'simulador' },
  '/med': { label: 'Simular ganhos →', target: 'calculadora' },
}

export default function Nav() {
  const pathname = usePathname()
  const cta = CTA_BY_ROUTE[pathname]

  const handleClick = () => {
    const target = cta ? cta.target : 'produtos'
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav>
      <div className="nav-inner">
        <Link href="/" className="logo">
          <span className="logo-wi">Wi</span><span className="logo-lly">lly</span><span className="logo-hub">hub</span>
        </Link>
        <div className="nav-links">
          <Link href="/ebook" className={pathname === '/ebook' ? 'nav-link active' : 'nav-link'}>Willy Ebook</Link>
          <Link href="/med" className={pathname === '/med' ? 'nav-link active' : 'nav-link'}>Willy Med</Link>
        </div>
        <button className="nav-btn" onClick={handleClick}>{cta ? cta.label : 'Ver soluções →'}</button>
      </div>
    </nav>
  )
}
