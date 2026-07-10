import { MED_PRODUCTS } from '@/lib/medProducts'

export default function Products() {
  return (
    <section className="how tm-products">
      <div className="sec-tag">Exemplo de simulação</div>
      <div className="how-title">
        5 produtos <span className="li">de exemplo</span> — o portfólio real tem <span className="cy">dezenas de especialidades</span>
      </div>
      <p className="tm-prod-intro">
        Saúde mental, medicina preventiva, odontologia, proteção de vida e amparo familiar — cada
        cliente ativo em qualquer um deles gera comissão recorrente para você, sem necessidade de
        nova venda a cada mês.
      </p>

      <div className="senso tm-portfolio-note">
        <strong>Estes 5 produtos são apenas um exemplo</strong> usado para simular o ganho na
        calculadora abaixo. O portfólio completo é muito maior: telemedicina com dezenas de
        especialidades ilimitadas, consultas presenciais em diversas especialidades médicas,
        plano odontológico nacional, seguro de vida com auxílio funeral e telepsicologia para
        crianças, jovens, adultos e indígenas — entre outras soluções que seguem entrando no
        portfólio.
      </div>

      <div className="tm-prod-grid">
        {MED_PRODUCTS.map((p) => (
          <div className="tm-prod-card" key={p.id}>
            <div className="tm-prod-emoji">{p.emoji}</div>
            <div className="tm-prod-name">{p.nome}</div>
            <div className="tm-prod-price">{p.precoCliente}</div>
            <div className="tm-prod-comm-l">Sua comissão / mês</div>
            <div className="tm-prod-comm-v">R$ {p.comissao.toFixed(2).replace('.', ',')}</div>
            <div className="tm-prod-base">{p.base}</div>
            <div className="tm-prod-desc">{p.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
