import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'leaflet/dist/leaflet.css';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
//{} - võetakse tükki 
//ilma from - mõjub globaalselst, ehk index.css käib iga faili kohta

//navigeereimises urlide vahetamiseks
//npm intsall;
//
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
