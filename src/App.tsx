// src/App.tsx
import AssignedChatsPage from './pages/AssignedChatsPage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainLayout from './components/layout/MainLayout'
import InboxPage from './pages/InboxPage'
import TemplatesPage from './pages/TemplatesPage'
import UnreadChatsPage from './pages/UnreadChatsPage' // ✅ Ruta correcta
import SimulatedMessagesProvider from './components/SimulatedMessagesProvider'


export default function App() {
  const isAuthenticated = !!localStorage.getItem('authToken')

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <SimulatedMessagesProvider>
                <MainLayout />
              </SimulatedMessagesProvider>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Navigate to="/inbox" replace />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="unread" element={<UnreadChatsPage />} /> {/* ✅ Solo una vez */}
          
          <Route path="settings" element={<div>Configuración</div>} />
          <Route path="assigned" element={<AssignedChatsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}