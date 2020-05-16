import Layout from '../components/ui/Layout'
import dynamic from 'next/dynamic'
import React from 'react'
const Scene = dynamic(() => import('../components/xr/scene/dream'), {
  ssr: false
})

export const DreamPage = () => (
  <Layout pageTitle="Home">
    {/* <Login /> */}
    <Scene />
  </Layout>
)

export default DreamPage
