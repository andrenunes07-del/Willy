import Link from 'next/link'

const SOLUTIONS = [
  {
    href: '/ebook',
    tag: 'Redução de impostos',
    accent: 'cy' as const,
    title: 'Willy Ebook',
    desc: 'Inclua ebooks e audiobooks culturais na base de clientes e reclassifique parte da receita como SVA — isenta de tributação federal. Economia imediata, sem mudar a operação.',
    feats: ['Isenção federal · Lei 12.761/2012', 'Simulador de economia fiscal completo', 'Ativação imediata, sem fidelidade'],
    cta: 'Ver simulador de economia →',
  },
  {
    href: '/med',
    tag: 'Comissão recorrente',
    accent: 'li' as const,
    title: 'Willy Med',
    desc: 'Ofereça telemedicina, odontologia, seguro de vida e outros produtos de bem-estar à sua base de clientes e ganhe comissão recorrente — sem mensalidade mínima.',
    feats: ['Formato vendeu, ganhou — sem custo fixo', 'Dezenas de especialidades no portfólio', 'Comissão recorrente por cliente ativo'],
    cta: 'Ver calculadora de ganhos →',
  },
]

export default function Products() {
  return (
    <section className="how" id="produtos">
      <div className="sec-tag">Nossas soluções</div>
      <div className="how-title">
        Escolha a solução <span className="cy">certa</span> para o seu <span className="li">momento</span>
      </div>

      <div className="hub-grid">
        {SOLUTIONS.map((s) => (
          <Link href={s.href} className={`hub-card ${s.accent}`} key={s.href}>
            <div className="hub-card-tag">{s.tag}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="hub-card-feats">
              {s.feats.map((f) => (
                <div className="feat" key={f}><span className="fdot" />{f}</div>
              ))}
            </div>
            <div className="hub-card-cta">{s.cta}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
