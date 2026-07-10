'use client'

import { useState } from 'react'
import LeadModal from './LeadModal'
import type { SimData } from '@/types/simData'

interface CTAProps {
  simData: SimData | null
}

export default function CTA({ simData }: CTAProps) {
  const [open, setOpen] = useState(false)
  const [hint, setHint] = useState(false)

  const scrollToSim = () => {
    const el = document.getElementById('simulador')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleClick = () => {
    if (!simData) {
      setHint(true)
      setTimeout(() => setHint(false), 4000)
      scrollToSim()
    } else {
      setOpen(true)
    }
  }

  return (
    <>
      <section className="cta-outer">
        <div className="cta-in">
          <div className="cta-left">
            <h2>
              Transforme <span className="cy">imposto</span> em{' '}
              <span className="li">margem</span> ainda este mês
            </h2>
            <p>
              Ativação imediata. Sem mudança operacional. Você já tem a base — nós temos o produto e o
              suporte.
            </p>
            <button className="btn-cy" onClick={handleClick}>
              Quero contratar agora →
            </button>
            {hint && (
              <p className="cta-sim-hint cta-sim-hint--active">
                ↑ Para contratar, primeiro simule sua economia acima — leva menos de 1 minuto.
              </p>
            )}
          </div>
          <div className="cta-right">
            <div className="price-box">
              <div className="pb-l">Mensalidade fixa</div>
              <div className="pb-v">R$ 498 <span style={{fontSize:'13px', fontWeight:400}}>/plano</span></div>
              <div className="pb-p">por mês</div>
              <div className="pb-s">Para bases de até 3.000 clientes ativos</div>
              <div className="pb-custo">
                R$ 0,16 <span>por cliente / mês</span>
              </div>
            </div>
            <div className="feats">
              <div className="feat"><span className="fdot" />Plataforma completa de ebooks e audiobooks</div>
              <div className="feat"><span className="fdot" />Conteúdo cultural isento de imposto federal</div>
              <div className="feat"><span className="fdot" />Ativação imediata após contratação</div>
              <div className="feat"><span className="fdot" />Suporte para enquadramento tributário</div>
            </div>
            <button className="btn-li" onClick={handleClick}>
              Começar agora →
            </button>
          </div>
        </div>
      </section>
      {open && simData && <LeadModal simData={simData} onClose={() => setOpen(false)} />}
    </>
  )
}
