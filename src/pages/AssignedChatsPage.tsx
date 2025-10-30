// src/pages/AssignedChatsPage.tsx
import { useMemo } from 'react'
import { useChatStore } from '../store/chatStore'
import ChatWindow from '../components/chat/ChatWindow'

// Simulamos que el agente actual es 'agent-1'
const CURRENT_AGENT = 'agent-1'

export default function AssignedChatsPage() {
  const { conversations, activeChatId, setActiveChat } = useChatStore()

  const assignedConversations = useMemo(() => {
    return conversations.filter(conv => conv.assignedTo === CURRENT_AGENT)
  }, [conversations])

  const activeChat = activeChatId
    ? conversations.find(c => c.id === activeChatId)
    : null

  // Si el chat activo no está asignado a este agente, limpiar selección
  if (activeChatId && !assignedConversations.some(c => c.id === activeChatId)) {
    setActiveChat(null)
  }

  return (
    <div className="flex h-full">
      {/* Lista de chats asignados */}
      <div className="w-96 border-r bg-white overflow-y-auto">
        {assignedConversations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No tienes chats asignados
          </div>
        ) : (
          assignedConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveChat(conv.id)}
              className={`flex items-center gap-3 p-4 border-l-4 cursor-pointer ${
                conv.platform === 'whatsapp'
                  ? 'border-l-whatsapp'
                  : conv.platform === 'facebook'
                  ? 'border-l-facebook'
                  : conv.platform === 'instagram'
                  ? 'border-l-instagram'
                  : 'border-l-tiktok'
              } ${activeChatId === conv.id ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                {conv.platform === 'whatsapp' ? '🟢' :
                 conv.platform === 'facebook' ? '🔵' :
                 conv.platform === 'instagram' ? '🔴' : '⚫'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{conv.name}</h3>
                <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Panel derecho */}
      <div className="flex-1 bg-gray-50">
        {activeChat ? <ChatWindow /> : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Selecciona un chat asignado
          </div>
        )}
      </div>
    </div>
  )
}