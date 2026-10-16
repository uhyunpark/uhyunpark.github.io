import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Agentation } from 'agentation'
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
          <Route path="/experience" element={<ResumePage />} />
          <Route path="/writing" element={<WritingsPage />} />
          <Route path="/writing/:slug" element={<WritingDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    {import.meta.env.DEV && <Agentation endpoint="http://localhost:4747" />}
  </StrictMode>,
)
