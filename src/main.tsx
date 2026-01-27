import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout.tsx'
import PersonalPage from './pages/PersonalPage.tsx'
import ResumePage from './pages/ResumePage.tsx'
import WritingsPage from './pages/WritingsPage.tsx'
import WritingDetailPage from './pages/WritingDetailPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PersonalPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/writings" element={<WritingsPage />} />
          <Route path="/writings/:slug" element={<WritingDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
