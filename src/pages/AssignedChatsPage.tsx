// src/pages/AssignedChatsPage.tsx
import { useMemo } from 'react'
import { useChatStore } from '../store/chatStore'
import ChatWindow from '../components/chat/ChatWindow'

export default function AssignedChatsPage() {
  const { conversations, activeChatId, setActiveChat, userRole } = useChatStore()

  // Filtrar chats asignados según el rol
  const assignedConversations = useMemo(() => {
    if (userRole === 'supervisor') {
      // Supervisor: ve todos los asignados (a cualquier agente)
      return conversations.filter(conv => conv.assignedTo !== 'unassigned')
    }
    // Agente: solo ve los asignados a 'agent-1' (tú)
    return conversations.filter(conv => conv.assignedTo === 'agent-1')
  }, [conversations, userRole])

  const activeChat = activeChatId
    ? conversations.find(c => c.id === activeChatId)
    : null

  return (
    <div className="flex h-full">
      {/* Lista de chats asignados */}
      <div className="w-96 border-r bg-white overflow-y-auto">
        {assignedConversations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {userRole === 'agent'
              ? 'No tienes chats asignados'
              : 'No hay chats asignados'}
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
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-900 truncate">{conv.name}</h3>
                  {userRole === 'supervisor' && (
                    <span className="text-xs text-blue-600">{conv.assignedTo}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Panel de chat */}
      <div className="flex-1 bg-gray-50">
        {activeChat ? <ChatWindow /> : (
          <div className="h-full flex items-center justify-center text-gray-500">
            {userRole === 'agent'
              ? 'Selecciona un chat asignado'
              : 'Selecciona un chat'}
          </div>
        )}
      </div>
    </div>
  )
}