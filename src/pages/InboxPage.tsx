// src/pages/InboxPage.tsx
import ConversationList from '../components/chat/ConversationList'
import ChatWindow from '../components/chat/ChatWindow'

export default function InboxPage() {
  return (
    <div className="flex h-full">
      {/* Columna izquierda: lista de conversaciones */}
      <div className="w-96 border-r bg-white">
        <ConversationList />
      </div>

      {/* Columna derecha: chat abierto */}
      <div className="flex-1 bg-gray-50">
        <ChatWindow />
      </div>
    </div>
  )
}