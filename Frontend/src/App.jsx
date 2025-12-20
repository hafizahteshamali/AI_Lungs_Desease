import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Routes/AppRoutes'
import { ToastContainer } from 'react-toastify'
import { AppointmentProvider } from './pages/Dashboards_pages/Appointments/AppointmentContext'

const App = () => {
  return (
    <BrowserRouter>
    <AppointmentProvider>
      <AppRoutes />
    </AppointmentProvider>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App