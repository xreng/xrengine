import Layout from '../components/ui/Layout'
import dynamic from 'next/dynamic'
import React from 'react'
const Scene = dynamic(() => import('../components/xr/scene'), { ssr: false })
// TODO: Make a TOS page

export const TermsOfServicePage = () => {
  return (
    <Layout pageTitle="Home">
      {/* <Login /> */}
      <Scene />
    </Layout>
  )
}
