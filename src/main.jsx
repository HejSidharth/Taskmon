import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider, useUser } from './lib/context/user.jsx'
import { IdeasProvider } from './lib/context/ideas.jsx'
import { ClerkProvider } from '@clerk/clerk-react'


const key = import.meta.env.VITE_CLERK
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <ClerkProvider
      publishableKey={key} 
      navigate={(to) => navigate(to)}
    >
      <IdeasProvider>
    <App />
    </IdeasProvider>
    </ClerkProvider>
  </React.StrictMode>,
)
