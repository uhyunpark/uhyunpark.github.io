import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import WritingsPage from './pages/WritingsPage.tsx'
import WritingDetailPage from './pages/WritingDetailPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/writings" element={<WritingsPage />} />
        <Route path="/writings/:slug" element={<WritingDetailPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
