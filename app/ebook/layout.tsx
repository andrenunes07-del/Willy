import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reduza seus Impostos — SVA para Provedores | Willy Hub',
  description: 'Provedores de internet incluem ebooks e audiobooks culturais na base de clientes e reclassificam parte da receita como SVA — isenta de tributação federal.',
}

export default function EbookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
