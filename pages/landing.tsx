import React from 'react'
import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('../components/xr/scene/landing'), { ssr: false })

export const IndexPage = () => <Scene />
