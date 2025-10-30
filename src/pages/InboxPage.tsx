// src/pages/InboxPage.tsx
import { useChatStore } from '../store/chatStore'
import ConversationList from '../components/chat/ConversationList'
import ChatWindow from '../components/chat/ChatWindow'

export default function InboxPage() {
  const { activeChatId } = useChatStore()

  return (
    <div className="flex h-full">
      <div className="w-96 border-r bg-white">
        <ConversationList />
      </div>
      <div className="flex-1 bg-gray-50">
        {activeChatId ? <ChatWindow /> : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Selecciona una conversación
          </div>
        )}
      </div>
    </div>
  )
}