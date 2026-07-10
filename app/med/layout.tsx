import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SVA Telemedicina — Comissão Recorrente para Parceiros | Willy Med',
  description: 'Ofereça dezenas de especialidades médicas, odontológicas e de proteção aos seus clientes. Sem mensalidade mínima — formato vendeu, ganhou, com comissão recorrente.',
}

export default function MedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
