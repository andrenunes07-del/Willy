'use client'

interface HeroProps {
  heroRoi: string
}

export default function Hero({ heroRoi }: HeroProps) {
  const scrollToSim = () => {
    document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="glow-cy" />
      <div className="glow-li" />
      <div className="hero-inner">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" />
            SVA · Serviço de Valor Agregado · CNAE SCM
          </div>
          <h1>
            Pague <span className="cy">menos</span><br />
            imposto sem<br />
            mudar <span className="li">nada</span>
          </h1>
          <p className="hero-lead">
            Provedores de internet incluem ebooks e audiobooks culturais na base de clientes e
            reclassificam parte da receita como SVA — isenta de tributação federal. A economia é
            imediata e cresce com sua base.
          </p>
          <button className="btn-cy" onClick={scrollToSim}>
            Calcular minha economia →
          </button>
        </div>
        <div className="hero-stats">
          <div className="hstat cy">
            <div className="hs-l">Imposto sobre SVA de livros digitais</div>
            <div className="hs-n">0%</div>
            <div className="hs-d">Isenção federal · Lei 12.761/2012</div>
          </div>
          <div className="hstat cy">
            <div className="hs-l">Redução típica na carga tributária</div>
            <div className="hs-n">Até 40%</div>
            <div className="hs-d">Proporcional ao percentual SVA adotado</div>
          </div>
          <div className="hstat li">
            <div className="hs-l">Retorno sobre o plano — 1º mês</div>
            <div className="hs-n">{heroRoi || 'Simule ↓'}</div>
            <div className="hs-d">R$ 498/mês para até 3.000 clientes</div>
          </div>
        </div>
      </div>
    </section>
  )
}
