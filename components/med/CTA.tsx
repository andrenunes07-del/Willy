'use client'

import { useState } from 'react'
import LeadModal from './LeadModal'
import type { MedSimData } from '@/types/medSimData'

interface CTAProps {
  simData: MedSimData | null
}

export default function CTA({ simData }: CTAProps) {
  const [open, setOpen] = useState(false)
  const [hint, setHint] = useState(false)

  const scrollToCalc = () => {
    const el = document.getElementById('calculadora')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleClick = () => {
    if (!simData) {
      setHint(true)
      setTimeout(() => setHint(false), 4000)
      scrollToCalc()
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
              Transforme sua base em <span className="li">renda</span>{' '}
              <span className="cy">recorrente</span>
            </h2>
            <p>
              Ative agora. Sem mensalidade mínima, sem taxa de adesão — você só ganha quando vende,
              e continua ganhando todo mês enquanto o cliente estiver ativo.
            </p>
            <button className="btn-cy" onClick={handleClick}>
              Quero ser parceiro →
            </button>
            {hint && (
              <p className="cta-sim-hint cta-sim-hint--active">
                ↑ Para virar parceiro, primeiro simule seu ganho na calculadora acima — leva menos de 1 minuto.
              </p>
            )}
          </div>
          <div className="cta-right">
            <div className="price-box">
              <div className="pb-l">Mensalidade fixa</div>
              <div className="pb-v">R$ 0</div>
              <div className="pb-p">formato vendeu, ganhou</div>
              <div className="pb-s">Comissão paga por cliente/vida ativa, todo mês</div>
              <div className="pb-custo">
                +50 <span>especialidades no portfólio completo</span>
              </div>
            </div>
            <div className="feats">
              <div className="feat"><span className="fdot" />Telemedicina, consultas presenciais, odontologia, seguro de vida e mais</div>
              <div className="feat"><span className="fdot" />Comissão recorrente enquanto o cliente estiver ativo</div>
              <div className="feat"><span className="fdot" />Sem taxa de adesão ou mensalidade mínima</div>
              <div className="feat"><span className="fdot" />Suporte para ativação da carteira de clientes</div>
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
