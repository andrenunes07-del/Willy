export interface MedProduct {
  id: string
  emoji: string
  nome: string
  precoCliente: string
  comissao: number
  base: string
  desc: string
}

export interface MedSimData {
  porProduto: { nome: string; emoji: string; clientes: number; comissao: number; subtotal: number }[]
  totalMensal: number
  totalAnual: number
  ticketCompleto: number
}
