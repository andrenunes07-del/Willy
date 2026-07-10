'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/med/Hero'
import Strip from '@/components/med/Strip'
import Products from '@/components/med/Products'
import CTA from '@/components/med/CTA'
import type { MedSimData } from '@/types/medSimData'

const Calculator = dynamic(() => import('@/components/med/Calculator'), { ssr: false })

export default function MedPage() {
  const [heroGanho, setHeroGanho] = useState('')
  const [simData, setSimData] = useState<MedSimData | null>(null)

  return (
    <>
      <Hero heroGanho={heroGanho} />
      <Strip />
      <Products />
      <Calculator onGanhoChange={setHeroGanho} onResult={setSimData} />
      <CTA simData={simData} />
    </>
  )
}
