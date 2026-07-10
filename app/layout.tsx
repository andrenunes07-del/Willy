import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Willy Hub — Comissão Recorrente e Redução de Impostos para Provedores',
  description: 'Hub de soluções para provedores: Willy Med gera comissão recorrente vendendo telemedicina e bem-estar à sua base, e Willy Ebook reduz sua carga tributária com reclassificação SVA.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Podkova:wght@800&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
