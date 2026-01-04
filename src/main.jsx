import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppRoutes from './Routes/AppRoutes.jsx'
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={AppRoutes} />
  </StrictMode>,
)
