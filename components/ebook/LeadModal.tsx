'use client'

import { useState } from 'react'
import type { SimData } from '@/types/simData'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwpPCr0Nmodg0JAxp5dDHGN6Rb7wKky4kIdVgDpSEGs5oJ9F0MA_zdk1A0g2rxw1eSB/exec'

const fmt = (v: number) => 'R$ ' + Math.round(v).toLocaleString('pt-BR')

interface Props {
  onClose: () => void
  simData: SimData
}

export default function LeadModal({ onClose, simData }: Props) {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, simData }),
      })
      setStatus('ok')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {status === 'ok' ? (
          <div className="modal-success">
            <div className="modal-success-icon">✓</div>
            <h3>Interesse registrado!</h3>
            <p>Enviamos uma confirmação para <strong>{form.email}</strong>.<br />Nossa equipe entrará em contato em breve.</p>
            <div className="modal-spam-hint">
              <span className="spam-icon">⚠️</span>
              <span>Como este é nosso primeiro contato, o e-mail de confirmação pode ter caído em <strong>spam</strong> ou <strong>promoções</strong>. Verifique essas pastas antes de aguardar na caixa principal.</span>
            </div>
            <button className="btn-cy" onClick={onClose}>Fechar</button>
          </div>
        ) : (
          <>
            <h3>Quero contratar o plano SVA</h3>
            <p>Confira abaixo o resultado da sua simulação e preencha seus dados.</p>

            <div className="modal-sim-summary">
              <div className="mss-row">
                <span>Clientes na base</span>
                <strong>{simData.clientes.toLocaleString('pt-BR')}</strong>
              </div>
              <div className="mss-row">
                <span>Ticket médio</span>
                <strong>{fmt(simData.ticket)}</strong>
              </div>
              <div className="mss-row">
                <span>Alíquota atual</span>
                <strong>{simData.aliquota.toFixed(1)}%</strong>
              </div>
              <div className="mss-row">
                <span>% SVA</span>
                <strong>{simData.pctSva}%</strong>
              </div>
              {simData.valorEbook > 0 && (
                <div className="mss-row">
                  <span>Valor SVA / cliente</span>
                  <strong>{fmt(simData.valorEbook)}</strong>
                </div>
              )}
              <div className="mss-row">
                <span>Planos necessários</span>
                <strong>{simData.nPlanos}× plano{simData.nPlanos > 1 ? 's' : ''} — R$ {simData.custoPlano.toLocaleString('pt-BR')}/mês</strong>
              </div>
              <div className="mss-row highlight">
                <span>Economia mensal</span>
                <strong className="grn">{fmt(simData.eco)}</strong>
              </div>
              <div className="mss-row highlight">
                <span>ROI no 1º mês</span>
                <strong className="grn">×{simData.roi.toFixed(1).replace('.', ',')}</strong>
              </div>
            </div>

            <form onSubmit={submit} className="modal-form">
              <label>Nome completo
                <input name="nome" type="text" required placeholder="Seu nome" value={form.nome} onChange={handle} />
              </label>
              <label>E-mail
                <input name="email" type="email" required placeholder="seu@email.com" value={form.email} onChange={handle} />
              </label>
              <label>Telefone / WhatsApp
                <input name="telefone" type="tel" required placeholder="(00) 00000-0000" value={form.telefone} onChange={handle} />
              </label>
              {status === 'error' && <p className="modal-error">Erro ao enviar. Tente novamente.</p>}
              <button className="btn-cy" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Enviando...' : 'Confirmar interesse →'}
              </button>
              <div className="modal-spam-hint">
                <span className="spam-icon">⚠️</span>
                <span>Um e-mail de confirmação será enviado ao endereço informado. Caso não receba, verifique a caixa de <strong>spam</strong> ou <strong>promoções</strong>.</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
