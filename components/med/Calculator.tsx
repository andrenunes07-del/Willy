'use client'

import { useState } from 'react'
import LeadModal from './LeadModal'
import { MED_PRODUCTS } from '@/lib/medProducts'
import type { MedSimData } from '@/types/medSimData'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  type ChartOptions,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarController, BarElement, Tooltip)

const fmt = (v: number) => 'R$ ' + Math.round(v).toLocaleString('pt-BR')
const fmtK = (v: number) =>
  v >= 1_000_000
    ? 'R$ ' + (v / 1_000_000).toFixed(1).replace('.', ',') + 'M'
    : v >= 1_000
    ? 'R$ ' + Math.round(v / 1_000) + 'K'
    : fmt(v)

const BAR_COLORS = ['#00D4E8', '#9EE62A', '#00D4E8', '#9EE62A', '#00D4E8']

interface CalculatorProps {
  onGanhoChange: (ganho: string) => void
  onResult: (data: MedSimData) => void
}

export default function Calculator({ onGanhoChange, onResult }: CalculatorProps) {
  const [clientes, setClientes] = useState<Record<string, number>>(() =>
    Object.fromEntries(MED_PRODUCTS.map((p) => [p.id, 500]))
  )
  const [result, setResult] = useState<MedSimData | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const setCliente = (id: string, v: number) => setClientes((c) => ({ ...c, [id]: v }))

  function calcular() {
    const porProduto = MED_PRODUCTS.map((p) => {
      const n = clientes[p.id] || 0
      return { nome: p.nome, emoji: p.emoji, clientes: n, comissao: p.comissao, subtotal: n * p.comissao }
    })

    const totalMensal = porProduto.reduce((acc, p) => acc + p.subtotal, 0)
    const totalAnual = totalMensal * 12
    const ticketCompleto = MED_PRODUCTS.reduce((acc, p) => acc + p.comissao, 0)

    const r: MedSimData = { porProduto, totalMensal, totalAnual, ticketCompleto }
    setResult(r)
    onGanhoChange(fmt(totalMensal) + '/mês')
    onResult(r)

    setTimeout(() => {
      document.getElementById('resultado-med')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const chartData = result
    ? {
        labels: result.porProduto.map((p) => p.emoji + ' ' + p.nome),
        datasets: [
          {
            type: 'bar' as const,
            label: 'Comissão mensal',
            data: result.porProduto.map((p) => p.subtotal),
            backgroundColor: BAR_COLORS,
            borderRadius: 2,
          },
        ],
      }
    : null

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (c) => ' ' + fmt(c.raw as number) + '/mês',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#6A7F8E', font: { size: 11 }, autoSkip: false },
        grid: { color: 'rgba(255,255,255,0.03)' },
        border: { color: 'rgba(255,255,255,0.06)' },
      },
      y: {
        ticks: {
          color: '#6A7F8E', font: { size: 11 },
          callback: (v) => Number(v) >= 1000 ? 'R$' + (Number(v) / 1000).toFixed(0) + 'K' : 'R$' + v,
        },
        grid: { color: 'rgba(255,255,255,0.03)' },
        border: { color: 'rgba(255,255,255,0.06)' },
      },
    },
  }

  return (
    <section className="sim-outer" id="calculadora">
      <div className="sim-top">
        <h2>Calculadora de <span className="cy">ganho recorrente</span></h2>
        <div className="sim-note">
          Simulação com 5 produtos de exemplo — seu portfólio real tem dezenas de especialidades.
          Informe quantos clientes ativos você projeta em cada produto. O cálculo roda no seu
          navegador — nenhum dado é enviado.
        </div>
      </div>

      <div className="sim-cols">
        {/* ── COLUNA ESQUERDA ── */}
        <div>
          <div className="col-head">Clientes ativos por produto (exemplo)</div>

          {MED_PRODUCTS.map((p) => (
            <div className="fg" key={p.id}>
              <label>{p.emoji} {p.nome} — comissão de R$ {p.comissao.toFixed(2).replace('.', ',')}/mês</label>
              <div className="irow">
                <input
                  type="number" className="suf" min={0}
                  value={clientes[p.id] === 0 ? '' : clientes[p.id]}
                  onChange={(e) => setCliente(p.id, parseInt(e.target.value) || 0)}
                />
                <span className="sx">clientes ativos</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── COLUNA DIREITA ── */}
        <div>
          <div className="col-head">Como funciona a comissão</div>

          <div className="senso">
            <strong>Sem mensalidade mínima:</strong> não há custo fixo para você. A comissão é
            paga por cliente/vida ativa, todo mês, enquanto ele permanecer utilizando o produto —
            sem necessidade de vender de novo.
          </div>

          <div className="senso" style={{ background: 'var(--cy-dim)', borderLeftColor: 'var(--cy)', color: 'rgba(0,212,232,0.8)' }}>
            <strong style={{ color: 'var(--cy)' }}>Portfólio complementar:</strong> os 5 produtos podem
            ser vendidos ao mesmo cliente. Um cliente com todos os produtos ativos gera R${' '}
            {MED_PRODUCTS.reduce((a, p) => a + p.comissao, 0).toFixed(2).replace('.', ',')}
            /mês em comissão recorrente.
          </div>

          <button className="btn-calc" onClick={calcular}>
            Calcular meu ganho mensal →
          </button>
        </div>
      </div>

      {/* ── RESULTADO ── */}
      {result && (
        <div id="resultado-med">
          <div className="res-top">
            <h2>Resultado da simulação</h2>
            <div className="res-ctx">
              {result.porProduto.filter((p) => p.clientes > 0).length} produto(s) com clientes ativos simulados
            </div>
          </div>

          <div className="tm-break">
            {result.porProduto.map((p) => (
              <div className="crow" key={p.nome}>
                <span className="cl">{p.emoji} {p.nome} — {p.clientes.toLocaleString('pt-BR')} clientes × R$ {p.comissao.toFixed(2).replace('.', ',')}</span>
                <span className="cv grn">{fmt(p.subtotal)}</span>
              </div>
            ))}
          </div>

          <div className="eco">
            <div className="eco-in">
              <div className="ecell">
                <div className="el">Ganho mensal recorrente</div>
                <div className="en">{fmt(result.totalMensal)}</div>
                <div className="ed">soma das comissões de todos os produtos simulados</div>
              </div>
              <div className="ecell">
                <div className="el">Projeção anual</div>
                <div className="en">{fmtK(result.totalAnual)}</div>
                <div className="ed">mantendo a mesma base ativa ao longo de 12 meses</div>
              </div>
              <div className="ecell">
                <div className="el">Cliente com portfólio completo</div>
                <div className="en">{fmt(result.ticketCompleto)}<span style={{ fontSize: 14, fontWeight: 400 }}>/mês</span></div>
                <div className="ed">se um mesmo cliente ativar os 5 produtos</div>
              </div>
            </div>
          </div>

          <div className="chart-sec">
            <div className="chart-hdr">
              <h3>Comissão mensal por produto</h3>
            </div>
            <div className="chart-box">
              <div className="chart-h">
                {chartData && (
                  <Chart
                    type="bar"
                    data={chartData}
                    options={chartOptions}
                    aria-label="Comissão mensal recorrente por produto"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="nota">
            <div className="nota-box">
              <strong>// nota</strong> — esta simulação usa 5 produtos de exemplo para ilustrar o
              cálculo. O portfólio real oferecido aos seus clientes tem dezenas de especialidades.
              A comissão é recorrente enquanto o cliente permanecer ativo no produto. Não há
              mensalidade mínima nem taxa de adesão: o ganho existe apenas sobre clientes
              efetivamente vendidos e ativos.
            </div>
          </div>

          <div className="sim-cta">
            <div className="sim-cta-text">
              <strong>Gostou do resultado?</strong> Fale com nossa equipe e comece a vender ainda este mês.
            </div>
            <button className="btn-cy" onClick={() => setModalOpen(true)}>
              Quero ser parceiro →
            </button>
          </div>
        </div>
      )}

      {modalOpen && result && (
        <LeadModal simData={result} onClose={() => setModalOpen(false)} />
      )}
    </section>
  )
}
