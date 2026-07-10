'use client'

interface HeroProps {
  heroGanho: string
}

export default function Hero({ heroGanho }: HeroProps) {
  const scrollToCalc = () => {
    document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' })
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
            SVA · TELEMEDICINA, BEM-ESTAR E PROTEÇÃO
          </div>
          <h1>
            Vendeu, <span className="li">ganhou</span><br />
            sem mensalidade<br />
            <span className="cy">mínima</span>
          </h1>
          <p className="hero-lead">
            Um SVA de telemedicina e bem-estar para você oferecer aos clientes da sua base — sem custo
            fixo mensal para o seu negócio. O modelo é simples: vendeu um plano, você ganha comissão
            recorrente todo mês enquanto o cliente permanecer ativo.
          </p>
          <p className="hero-sublead">
            O portfólio completo tem dezenas de especialidades — telemedicina, consultas presenciais,
            odontologia, seguro de vida e mais. Os produtos abaixo são apenas um exemplo usado para
            simular seu ganho.
          </p>
          <button className="btn-cy" onClick={scrollToCalc}>
            Simular meu ganho mensal →
          </button>
        </div>
        <div className="hero-stats">
          <div className="hstat li">
            <div className="hs-l">Custo fixo mensal para o parceiro</div>
            <div className="hs-n">R$ 0</div>
            <div className="hs-d">Formato vendeu, ganhou — sem mensalidade mínima</div>
          </div>
          <div className="hstat cy">
            <div className="hs-l">Produtos de exemplo nesta simulação</div>
            <div className="hs-n">5</div>
            <div className="hs-d">De um portfólio com dezenas de especialidades</div>
          </div>
          <div className="hstat li">
            <div className="hs-l">Ganho mensal recorrente simulado</div>
            <div className="hs-n">{heroGanho || 'Simule ↓'}</div>
            <div className="hs-d">Recorrente enquanto o cliente estiver ativo</div>
          </div>
        </div>
      </div>
    </section>
  )
}
