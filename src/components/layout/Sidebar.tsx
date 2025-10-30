// src/components/layout/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom'
import { useChatStore } from '../../store/chatStore'

const navItems = [
  { name: 'Bandeja de entrada', path: '/inbox', icon: '📥' },
  { name: 'Chats no leídos', path: '/unread', icon: '🔔' },
  { name: 'Chats asignados', path: '/assigned', icon: '🧑‍💼' },
  { name: 'Plantillas', path: '/templates', icon: '📄' },
  { name: 'Configuración', path: '/settings', icon: '⚙️' },
]

//export default function Sidebar() {
  //const location = useLocation()
export default function Sidebar() {
  const unreadCount = useChatStore(state =>
    state.conversations.filter(c => c.unread).length
  )
  const location = useLocation()

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Technology Evolution</h1>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => (
  <Link
    key={item.path}
    to={item.path}
    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
      location.pathname === item.path
        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
  >
    <div className="flex items-center gap-3">
      <span>{item.icon}</span>
      <span>{item.name}</span>
    </div>
    {/* Mostrar contador solo en "Chats no leídos" */}
    {item.path === '/unread' && unreadCount > 0 && (
      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {unreadCount}
      </span>
    )}
  </Link>
))}
      </nav>
    </div>
  )
}