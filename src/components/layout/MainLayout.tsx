// src/components/layout/MainLayout.tsx
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 overflow-hidden">
          <Outlet /> {/* ← ESTO ES OBLIGATORIO */}
        </main>
      </div>
    </div>
  )
}