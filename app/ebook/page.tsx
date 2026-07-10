'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/ebook/Hero'
import Strip from '@/components/ebook/Strip'
import HowItWorks from '@/components/ebook/HowItWorks'
import CTA from '@/components/ebook/CTA'
import type { SimData } from '@/types/simData'

const Simulator = dynamic(() => import('@/components/ebook/Simulator'), { ssr: false })

export default function EbookPage() {
  const [heroRoi, setHeroRoi] = useState('')
  const [simData, setSimData] = useState<SimData | null>(null)

  return (
    <>
      <Hero heroRoi={heroRoi} />
      <Strip />
      <HowItWorks />
      <Simulator onRoiChange={setHeroRoi} onResult={setSimData} />
      <CTA simData={simData} />
    </>
  )
}
