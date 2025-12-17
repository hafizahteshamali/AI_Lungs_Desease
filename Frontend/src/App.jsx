import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Routes/AppRoutes'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App