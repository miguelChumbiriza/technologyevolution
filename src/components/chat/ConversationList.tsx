// src/components/chat/ConversationList.tsx
import { useMemo } from 'react'
import { useChatStore } from '../../store/chatStore'

const platformIcons: Record<string, string> = {
  whatsapp: '🟢',
  facebook: '🔵',
  instagram: '🔴',
  tiktok: '⚫',
}

const platformColors: Record<string, string> = {
  whatsapp: 'border-l-whatsapp',
  facebook: 'border-l-facebook',
  instagram: 'border-l-instagram',
  tiktok: 'border-l-tiktok',
}

export default function ConversationList() {
  // ✅ Destructura TODO lo que necesitas
  const { conversations, activeChatId, setActiveChat, filter, searchQuery, userRole } = useChatStore()

  // ✅ Filtra conversaciones
  const filteredConversations = useMemo(() => {
    return conversations
      .filter(conv => {
        if (filter !== 'all' && conv.platform !== filter) return false
        const query = searchQuery.toLowerCase()
        return (
          conv.name.toLowerCase().includes(query) ||
          conv.lastMessage.toLowerCase().includes(query)
        )
      })
  }, [conversations, filter, searchQuery])

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-gray-800">
      {filteredConversations.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No se encontraron conversaciones
        </div>
      ) : (
        filteredConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => setActiveChat(conv.id)}
            className={`flex items-center gap-3 p-4 border-l-4 cursor-pointer ${
              platformColors[conv.platform]
            } ${activeChatId === conv.id ? 'bg-blue-50 dark:bg-blue-900' : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700'}`}
          >
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              {platformIcons[conv.platform]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">{conv.name}</h3>
                <span className="text-xs text-gray-500">{conv.time}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {conv.unread && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{conv.lastMessage}</p>
              </div>
              {/* ✅ Solo muestra asignación si eres supervisor */}
              {userRole === 'supervisor' && conv.assignedTo !== 'unassigned' && (
                <span className="text-xs text-blue-600 mt-1">
                  Asignado: {conv.assignedTo}
                </span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}