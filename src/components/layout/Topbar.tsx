// src/components/layout/Topbar.tsx
import { useChatStore } from '../../store/chatStore'

export default function Topbar() {
  const { filter, setFilter, searchQuery, setSearchQuery } = useChatStore()

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between">
      {/* Buscador */}
      <div className="relative w-96">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar conversaciones..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-300">🔍</span>
      </div>

      {/* Filtros y notificaciones */}
      <div className="flex items-center gap-4">
        {/* Filtro por red social */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                      focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">Todas las redes</option>
          <option value="whatsapp">🟢 WhatsApp</option>
          <option value="facebook">🔵 Facebook</option>
          <option value="instagram">🔴 Instagram</option>
          <option value="tiktok">⚫ TikTok</option>
        </select>

        {/* Notificaciones */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          🔔
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
          U
        </div>
      </div>
    </header>
  )
}