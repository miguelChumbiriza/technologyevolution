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
  const { conversations, activeChatId, setActiveChat, filter, searchQuery } = useChatStore()

  const filteredConversations = useMemo(() => {
    return conversations
      .filter(conv => {
        // Filtro por red social
        if (filter !== 'all' && conv.platform !== filter) return false
        // Filtro por búsqueda (nombre o último mensaje)
        const query = searchQuery.toLowerCase()
        return (
          conv.name.toLowerCase().includes(query) ||
          conv.lastMessage.toLowerCase().includes(query)
        )
      })
  }, [conversations, filter, searchQuery])

  return (
    <div className="h-full overflow-y-auto">
      {filteredConversations.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          {searchQuery
            ? 'No se encontraron conversaciones'
            : 'No hay conversaciones en esta red social'}
        </div>
      ) : (
        filteredConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => setActiveChat(conv.id)}
            className={`flex items-center gap-3 p-4 border-l-4 cursor-pointer ${
              platformColors[conv.platform]
            } ${activeChatId === conv.id ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
          >
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              {platformIcons[conv.platform]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900 truncate">{conv.name}</h3>
                <span className="text-xs text-gray-500">{conv.time}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {conv.unread && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
                <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}