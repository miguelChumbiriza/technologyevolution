// src/components/chat/ChatWindow.tsx
import { useState, useEffect } from 'react'
import { useChatStore } from '../../store/chatStore'

export default function ChatWindow() {
  const { conversations, activeChatId, addMessage, templates } = useChatStore()
  const [input, setInput] = useState('')

  // Limpiar el input al cambiar de chat
  useEffect(() => {
    setInput('')
  }, [activeChatId])

  const activeChat = conversations.find(c => c.id === activeChatId)
  const messages = activeChat?.messages || []

  // Filtrar plantillas compatibles
  const compatibleTemplates = templates.filter(tpl =>
    tpl.platform === 'all' || tpl.platform === activeChat?.platform
  )

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && activeChatId && activeChat) {
      addMessage(activeChatId, {
        text: input.trim(),
        own: true,
        platform: activeChat.platform,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      })
      setInput('')
    }
  }

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Selecciona una conversación
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Encabezado del chat */}
      <div className="bg-white border-b p-4">
        <h2 className="font-semibold">{activeChat.name}</h2>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`text-xs ${
              activeChat.platform === 'whatsapp'
                ? 'text-whatsapp'
                : activeChat.platform === 'facebook'
                ? 'text-facebook'
                : activeChat.platform === 'instagram'
                ? 'text-instagram'
                : 'text-tiktok'
            }`}
          >
            {activeChat.platform.charAt(0).toUpperCase() + activeChat.platform.slice(1)}
          </span>
          <span className="text-xs text-gray-500">en línea</span>
        </div>
      </div>

      {/* Historial de mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.own ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.own ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              <div className="flex items-center gap-1 mb-1">
                {!msg.own && (
                  <span
                    className={`text-xs ${
                      msg.platform === 'whatsapp'
                        ? 'text-whatsapp'
                        : msg.platform === 'facebook'
                        ? 'text-facebook'
                        : msg.platform === 'instagram'
                        ? 'text-instagram'
                        : 'text-tiktok'
                    }`}
                  >
                    {msg.platform === 'whatsapp'
                      ? '🟢'
                      : msg.platform === 'facebook'
                      ? '🔵'
                      : msg.platform === 'instagram'
                      ? '🔴'
                      : '⚫'}
                  </span>
                )}
                <span className="text-xs opacity-70">{msg.timestamp}</span>
              </div>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Área de composición (solo una) */}
      <div className="bg-white border-t p-4">
        <div className="flex gap-2 items-end">
          {/* Menú de plantillas */}
          {compatibleTemplates.length > 0 && (
            <div className="relative group">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 text-lg p-2 rounded hover:bg-gray-100"
                title="Insertar plantilla"
              >
                📄
              </button>
              <div className="absolute bottom-full mb-1 left-0 z-10 hidden group-hover:block bg-white border rounded shadow-lg w-64 max-h-60 overflow-y-auto">
                <div className="p-2 text-xs text-gray-500 border-b">Plantillas rápidas</div>
                {compatibleTemplates.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setInput(tpl.content)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 truncate"
                    title={tpl.content}
                  >
                    <div className="font-medium">{tpl.name}</div>
                    <div className="text-gray-600 text-xs truncate">{tpl.content}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Botón de adjuntar */}
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 text-lg p-2"
            title="Adjuntar archivo"
          >
            📎
          </button>

          {/* Campo de mensaje */}
          <form onSubmit={handleSend} className="flex-1 flex flex-col">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              rows={2}
            />
            <div className="mt-1 text-right">
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}