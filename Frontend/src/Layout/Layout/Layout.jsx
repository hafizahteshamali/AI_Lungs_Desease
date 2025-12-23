import React from 'react'
import Navigation from '../../Navigation/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../Navigation/Footer'

const Layout = () => {
  return (
    <div>
        <Navigation />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout