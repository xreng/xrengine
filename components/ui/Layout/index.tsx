import getConfig from 'next/config'
import React from 'react'
import NavMenu from '../NavMenu'
import Footer from '../Footer'
import Head from 'next/head'
import '../../../scss/style.scss' // Global style
import './style.scss'
import Alerts from '../Common/Alerts'
import UIDialog from '../Dialog/Dialog'

const { publicRuntimeConfig } = getConfig()
const siteTitle: string = publicRuntimeConfig.siteTitle

type Props = {
  pageTitle: string
  children: any
}

const Layout = (props: Props) => {
  const { pageTitle, children } = props
  return (
    <section>
      <Head>
        <title>
          {siteTitle} | {pageTitle}
        </title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.slim.js" />
      </Head>
      <header>
        <NavMenu />
      </header>
      <React.Fragment>
        <UIDialog />
        <Alerts />
        {children}
      </React.Fragment>
      <Footer />
    </section>
  )
}

export default Layout
