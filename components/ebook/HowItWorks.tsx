const steps = [
  {
    n: '01',
    title: 'Você adiciona ebooks à base',
    desc: 'Conteúdo digital cultural entra como benefício ao plano existente. O cliente não paga a mais. Nada muda operacionalmente.',
  },
  {
    n: '02',
    title: 'Parte da receita vira SVA',
    desc: 'Uma parcela do faturamento passa a ser registrada como Serviço de Valor Agregado — modalidade com isenção tributária federal.',
  },
  {
    n: '03',
    title: 'Imposto só sobre o SCM',
    desc: 'A alíquota incide apenas sobre a parcela SCM. A parte SVA sai limpa. Mesmo faturamento, muito menos imposto.',
  },
  {
    n: '04',
    title: 'Economia cresce com a base',
    desc: 'Conforme a carteira cresce, a economia absoluta aumenta mês a mês enquanto a mensalidade permanece fixa em R$ 498.',
  },
]

export default function HowItWorks() {
  return (
    <section className="how">
      <div className="sec-tag">Como funciona</div>
      <div className="how-title">
        Do <span className="cy">imposto</span> ao <span className="li">caixa</span> em quatro passos
      </div>
      <div className="how-grid">
        {steps.map((s) => (
          <div className="how-step" key={s.n}>
            <div className="hn">{s.n}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
