'use client'

import { useState, useRef, useEffect } from 'react'
import LeadModal from './LeadModal'
import type { SimData } from '@/types/simData'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  type ChartOptions,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarController, BarElement, LineController, LineElement, PointElement, Filler, Tooltip)

const fmt  = (v: number) => 'R$ ' + Math.round(v).toLocaleString('pt-BR')
const fmtK = (v: number) =>
  v >= 1_000_000
    ? 'R$ ' + (v / 1_000_000).toFixed(1).replace('.', ',') + 'M'
    : v >= 1_000
    ? 'R$ ' + Math.round(v / 1_000) + 'K'
    : fmt(v)

interface Result {
  fat: number
  aliq: number
  impSem: number
  liqSem: number
  scm: number
  sva: number
  impCom: number
  liqCom: number
  eco: number
  ecoPct: number
  ecoAnual: number
  roi: number
  nPlanos: number
  custoPlano: number
  cli12: number
  totSem: number
  totCom: number
  pctSVA: number
  pctSCM: number
  labels: string[]
  dSem: number[]
  dCom: number[]
  dAc: number[]
  ctx: string
}

interface SimulatorProps {
  onRoiChange: (roi: string) => void
  onResult: (data: SimData) => void
}

export default function Simulator({ onRoiChange, onResult }: SimulatorProps) {
  const [clientes, setClientes]       = useState(1000)
  const [ticket, setTicket]           = useState(100)
  const [aliquota, setAliquota]       = useState(8)
  const [crescimento, setCrescimento] = useState(30)
  const [pctSva, setPctSva]           = useState(30)
  const [result, setResult]           = useState<Result | null>(null)
  const [modalOpen, setModalOpen]     = useState(false)
  const [simData, setSimData]         = useState<SimData | null>(null)

  const aliqLabel = aliquota <= 5
    ? 'Simples Nacional — Anexo I'
    : aliquota <= 7
    ? 'Faixa 2'
    : aliquota <= 9
    ? 'Faixa 3/4'
    : 'Lucro Presumido'

  const svaHint = pctSva > 49
    ? <span style={{ color: 'var(--danger)' }}>{100 - pctSva}% SCM — acima do recomendado</span>
    : <>{100 - pctSva}% permanece como SCM — dentro do recomendado</>

  function calcular() {
    if (!clientes || !ticket) { alert('Preencha clientes e ticket médio.'); return }

    const aliq  = aliquota / 100
    const pSVA  = pctSva / 100
    const pSCM  = 1 - pSVA

    const fat    = clientes * ticket
    const impSem = fat * aliq
    const liqSem = fat - impSem
    const scm    = fat * pSCM
    const sva    = fat * pSVA
    const impCom = scm * aliq
    const liqCom = fat - impCom

    const eco      = impSem - impCom
    const ecoPct   = Math.round(eco / impSem * 100)
    const nPlanos  = Math.ceil(clientes / 3000)
    const custoPlano = nPlanos * 498
    const roi      = eco / custoPlano

    let totSem = 0, totCom = 0
    const labels: string[] = [], dSem: number[] = [], dCom: number[] = [], dAc: number[] = []

    for (let m = 1; m <= 12; m++) {
      const cli = clientes + (m - 1) * crescimento
      const f   = cli * ticket
      const iS  = f * aliq
      const iC  = f * pSCM * aliq
      totSem += iS; totCom += iC
      labels.push('M' + m)
      dSem.push(Math.round(iS))
      dCom.push(Math.round(iC))
      dAc.push(Math.round(totSem - totCom))
    }

    const cli12    = clientes + 11 * crescimento
    const ecoAnual = totSem - totCom

    const r: Result = {
      fat, aliq, impSem, liqSem, scm, sva, impCom, liqCom,
      eco, ecoPct, ecoAnual, roi, nPlanos, custoPlano, cli12,
      totSem, totCom,
      pctSVA: pSVA, pctSCM: pSCM,
      labels, dSem, dCom, dAc,
      ctx: `${clientes.toLocaleString('pt-BR')} clientes · ticket ${fmt(ticket)} · alíquota ${aliquota.toFixed(1)}% · ${pctSva}% SVA`,
    }

    setResult(r)
    onRoiChange('×' + roi.toFixed(1).replace('.', ',') + ' no 1º mês')
    const sd: SimData = { clientes, ticket, aliquota, pctSva, valorEbook: 0, crescimento, eco, ecoAnual, roi, ecoPct, nPlanos, custoPlano }
    onResult(sd)
    setSimData(sd)

    setTimeout(() => {
      document.getElementById('resultado')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const chartData = result
    ? {
        labels: result.labels,
        datasets: [
          {
            type: 'bar' as const,
            label: 'Sem SVA',
            data: result.dSem,
            backgroundColor: 'rgba(255,92,92,0.50)',
            borderColor: 'rgba(255,92,92,0.80)',
            borderWidth: 1,
            borderRadius: 2,
            order: 2,
          },
          {
            type: 'bar' as const,
            label: 'Com SVA',
            data: result.dCom,
            backgroundColor: 'rgba(0,212,232,0.45)',
            borderColor: 'rgba(0,212,232,0.75)',
            borderWidth: 1,
            borderRadius: 2,
            order: 2,
          },
          {
            type: 'line' as const,
            label: 'Eco. acumulada',
            data: result.dAc,
            borderColor: '#9EE62A',
            backgroundColor: 'rgba(158,230,42,0.06)',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#9EE62A',
            fill: true,
            tension: 0.35,
            yAxisID: 'y2',
            order: 1,
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
          label: (c) => ' ' + c.dataset.label + ': R$ ' + Math.round(c.raw as number).toLocaleString('pt-BR'),
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
      y2: {
        position: 'right' as const,
        ticks: {
          color: 'rgba(158,230,42,0.5)', font: { size: 11 },
          callback: (v) => Number(v) >= 1000 ? 'R$' + (Number(v) / 1000).toFixed(0) + 'K' : 'R$' + v,
        },
        grid: { display: false },
        border: { color: 'rgba(158,230,42,0.1)' },
      },
    },
  }

  return (
    <section className="sim-outer" id="simulador">
      <div className="sim-top">
        <h2>Simulador de <span className="cy">economia fiscal</span></h2>
        <div className="sim-note">
          Preencha os dados do seu provedor. O cálculo roda no seu navegador — nenhum dado é enviado.
        </div>
      </div>

      <div className="sim-cols">
        {/* ── COLUNA ESQUERDA ── */}
        <div>
          <div className="col-head">Dados do provedor</div>

          <div className="fg">
            <label>Clientes ativos na base</label>
            <div className="irow">
              <input
                type="number" min={1} value={clientes === 0 ? '' : clientes}
                onChange={(e) => setClientes(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="fg">
            <label>Ticket médio por cliente / mês</label>
            <div className="irow">
              <span className="px">R$</span>
              <input
                type="number" className="pi" min={1} value={ticket === 0 ? '' : ticket}
                onChange={(e) => setTicket(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="fg">
            <label>
              Alíquota atual —{' '}
              <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
                {aliqLabel}
              </span>
            </label>
            <div className="rg">
              <input
                type="range" min={4} max={12} value={aliquota} step={0.5}
                onChange={(e) => setAliquota(parseFloat(e.target.value))}
              />
            </div>
            <div className="rg-bot">
              <span className="rg-val">{aliquota.toFixed(1).replace('.', ',')}%</span>
              <span className="rg-hint">Pequeno e médio porte: 4% a 12% conforme enquadramento</span>
            </div>
          </div>

          <div className="fg">
            <label>Crescimento médio mensal</label>
            <div className="irow">
              <input
                type="number" className="suf" min={0} value={crescimento === 0 ? '' : crescimento}
                onChange={(e) => setCrescimento(parseInt(e.target.value) || 0)}
              />
              <span className="sx">clientes / mês</span>
            </div>
          </div>
        </div>

        {/* ── COLUNA DIREITA ── */}
        <div>
          <div className="col-head">Parâmetros do SVA</div>

          <div className="senso">
            <strong>Bom senso regulatório:</strong> não há lei federal fixando o limite. A prática
            recomendada é manter ao menos <strong>51% como SCM</strong> para preservar o CNAE e
            evitar questionamentos futuros.
          </div>

          <div className="fg">
            <label>% da receita a classificar como SVA</label>
            <div className="rg">
              <input
                type="range" min={5} max={49} value={pctSva} step={1}
                onChange={(e) => setPctSva(parseInt(e.target.value))}
              />
            </div>
            <div className="rg-bot">
              <span className="rg-val">{pctSva}%</span>
              <span className="rg-hint">{svaHint}</span>
            </div>
          </div>

          <button className="btn-calc" onClick={calcular}>
            Calcular economia →
          </button>
        </div>
      </div>

      {/* ── RESULTADO ── */}
      {result && (
        <div id="resultado">
          <div className="res-top">
            <h2>Resultado da simulação</h2>
            <div className="res-ctx">{result.ctx}</div>
          </div>

          <div className="cmp">
            <div className="cmp-col">
              <div className="ctitle red">// sem SVA — situação atual</div>
              <div className="crow"><span className="cl">Faturamento mensal</span><span className="cv">{fmt(result.fat)}</span></div>
              <div className="crow"><span className="cl">Alíquota aplicada</span><span className="cv">{(result.aliq * 100).toFixed(1)}%</span></div>
              <div className="crow"><span className="cl">Imposto mensal</span><span className="cv red">{fmt(result.impSem)}</span></div>
              <div className="crow"><span className="cl">Receita líquida</span><span className="cv">{fmt(result.liqSem)}</span></div>
            </div>
            <div className="cmp-col">
              <div className="ctitle cy">// com SVA — após reclassificação</div>
              <div className="crow"><span className="cl">Receita SCM ({Math.round(result.pctSCM * 100)}% — tributável)</span><span className="cv">{fmt(result.scm)}</span></div>
              <div className="crow"><span className="cl">Receita SVA ({Math.round(result.pctSVA * 100)}% — isenta)</span><span className="cv grn">{fmt(result.sva)}</span></div>
              <div className="crow"><span className="cl">Imposto mensal</span><span className="cv red">{fmt(result.impCom)}</span></div>
              <div className="crow"><span className="cl">Receita líquida</span><span className="cv grn">{fmt(result.liqCom)}</span></div>
            </div>
          </div>

          <div className="eco">
            <div className="eco-in">
              <div className="ecell">
                <div className="el">Economia mensal</div>
                <div className="en">{fmt(result.eco)}</div>
                <div className="ed">imposto que deixa de sair do caixa todo mês</div>
              </div>
              <div className="ecell">
                <div className="el">Redução da carga</div>
                <div className="en">{result.ecoPct}%</div>
                <div className="ed">percentual de redução efetiva nos impostos</div>
              </div>
              <div className="ecell">
                <div className="el">Economia anual projetada</div>
                <div className="en">{fmtK(result.ecoAnual)}</div>
                <div className="ed">com o crescimento da base incluso</div>
              </div>
            </div>
          </div>

          <div className="plano">
            <div className="plano-l">
              <strong>
                {result.nPlanos === 1
                  ? 'Plano Willy — até 3.000 clientes'
                  : `${result.nPlanos}× Plano Willy — ${result.nPlanos * 3000} clientes`}
              </strong>
              <span>
                {result.nPlanos > 1
                  ? `Sua base ultrapassa ${(result.nPlanos - 1) * 3000} clientes, por isso são necessários ${result.nPlanos} planos.`
                  : 'Distribuição completa de ebooks e audiobooks. Ativação imediata, sem fidelidade.'}
              </span>
            </div>
            <div className="plano-r">
              <div className="pval">
                <div className="pvl">Mensalidade{result.nPlanos > 1 ? ` (${result.nPlanos}×)` : ''}</div>
                <div className="pvn">R$ {result.custoPlano.toLocaleString('pt-BR')}</div>
                <div className="pvs">por mês</div>
              </div>
              <div className="vsep" />
              <div className="roival">
                <div className="rl">ROI no 1º mês</div>
                <div className="rn">×{result.roi.toFixed(1).replace('.', ',')}</div>
                <div className="rd">a cada R$ 1 investido</div>
              </div>
            </div>
          </div>

          <div className="chart-sec">
            <div className="chart-hdr">
              <h3>Projeção — 12 meses</h3>
              <div className="legs">
                <div className="leg"><span className="leg-sq" style={{ background: 'rgba(255,92,92,0.65)' }} />Sem SVA</div>
                <div className="leg"><span className="leg-sq" style={{ background: 'rgba(0,212,232,0.65)' }} />Com SVA</div>
                <div className="leg"><span className="leg-sq" style={{ background: 'rgba(158,230,42,0.75)' }} />Eco. acum.</div>
              </div>
            </div>
            <div className="chart-box">
              <div className="chart-h">
                {chartData && (
                  <Chart
                    type="bar"
                    data={chartData}
                    options={chartOptions}
                    aria-label="Comparativo de imposto com e sem SVA ao longo de 12 meses"
                  />
                )}
              </div>
            </div>
            <div className="acum">
              <div className="acell">
                <div className="al">Clientes no mês 12</div>
                <div className="av">{result.cli12.toLocaleString('pt-BR')}</div>
                <div className="ad">com crescimento acumulado</div>
              </div>
              <div className="acell">
                <div className="al">Impostos sem SVA — 12 meses</div>
                <div className="av red">{fmtK(result.totSem)}</div>
                <div className="ad">total acumulado no ano</div>
              </div>
              <div className="acell">
                <div className="al">Economia total no ano</div>
                <div className="av grn">{fmtK(result.ecoAnual)}</div>
                <div className="ad">imposto que deixa de ser pago</div>
              </div>
            </div>
          </div>

          <div className="nota">
            <div className="nota-box">
              <strong>// nota</strong> — esta simulação considera {Math.round(result.pctSVA * 100)}% da receita como SVA.
              Não há lei federal que fixe esse limite, mas recomenda-se manter ao menos 51% como SCM para preservar o CNAE.
              Consulte seu contador.
            </div>
          </div>

          <div className="sim-cta">
            <div className="sim-cta-text">
              <strong>Gostou do resultado?</strong> Fale com nossa equipe e ative o plano ainda este mês.
            </div>
            <button className="btn-cy" onClick={() => setModalOpen(true)}>
              Quero contratar agora →
            </button>
          </div>
        </div>
      )}

      {modalOpen && simData && (
        <LeadModal simData={simData} onClose={() => setModalOpen(false)} />
      )}
    </section>
  )
}
