import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { ImageProvider } from './context/ImageContext.tsx'
import { UserProvider } from './context/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
    <ImageProvider>
      <App />
    </ImageProvider>
    </UserProvider>
  </StrictMode>,
)

