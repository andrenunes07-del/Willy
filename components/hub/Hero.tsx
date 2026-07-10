'use client'

export default function Hero() {
  const scrollToProdutos = () => {
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })
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
            WILLY HUB · SOLUÇÕES PARA PROVEDORES
          </div>
          <h1>
            Que tal <span className="cy">economizar</span><br />
            de um lado e <span className="li">lucrar</span><br />
            do outro?
          </h1>
          <p className="hero-lead">
            Reunimos soluções para dois objetivos do seu negócio: gerar comissão recorrente
            vendendo novos serviços para a sua base de clientes, e reduzir a carga tributária com
            reclassificação SVA. Escolha a solução abaixo e comece agora.
          </p>
          <button className="btn-cy" onClick={scrollToProdutos}>
            Ver soluções →
          </button>
        </div>
        <div className="hero-stats">
          <div className="hstat cy">
            <div className="hs-l">Soluções disponíveis no hub</div>
            <div className="hs-n">2 <span className="hs-n-note">(por enquanto)</span></div>
            <div className="hs-d">Comissão recorrente e redução de impostos.</div>
          </div>
          <div className="hstat li">
            <div className="hs-l">Mensalidade no Willy Med</div>
            <div className="hs-n">R$ 0</div>
            <div className="hs-d">Formato vendeu, ganhou — comissão recorrente</div>
          </div>
          <div className="hstat cy">
            <div className="hs-l">Redução de imposto no Willy Ebook</div>
            <div className="hs-n">Até 40%</div>
            <div className="hs-d">Redução recomendada, proporcional ao % de SVA adotado</div>
          </div>
        </div>
      </div>
    </section>
  )
}
