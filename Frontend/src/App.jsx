import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Routes/AppRoutes'
import { AppointmentProvider } from './pages/Dashboards_pages/Appointments/AppointmentContext'

const App = () => {
  return (
    <BrowserRouter>
    <AppointmentProvider>
      <AppRoutes />
    </AppointmentProvider>
    </BrowserRouter>
  )
}

export default App