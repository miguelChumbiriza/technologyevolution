// src/hooks/useSimulatedMessages.ts
import { useEffect } from 'react'
import { useChatStore } from '../store/chatStore'
import type { Conversation, Platform } from '../store/chatStore'

// Mensajes simulados entrantes
const mockIncomingMessages: Array<{
    conversationId: string
    text: string
    platform: Platform
    name?: string
}> = [
        {
            conversationId: '1',
            text: '¿Puedes ayudarme con el envío?',
            platform: 'whatsapp',
        },
        {
            conversationId: '3',
            name: 'Luis Ramírez',
            text: 'Hola, ¿tienen soporte en vivo?',
            platform: 'facebook',
        },
        {
            conversationId: '2',
            text: '¿Podrían enviar el catálogo?',
            platform: 'instagram',
        },
        {
            conversationId: '4',
            name: 'Usuario TikTok',
            text: '¿Tienen descuentos para seguidores?',
            platform: 'tiktok',
        },
    ]

export function useSimulatedMessages() {
    const {
        conversations,
        activeChatId,
        addMessage,
        addNewConversation,
        addNotification,
    } = useChatStore()

    useEffect(() => {
        const interval = setInterval(() => {
            const randomMsg = mockIncomingMessages[Math.floor(Math.random() * mockIncomingMessages.length)]

            const existingChat = conversations.find(c => c.id === randomMsg.conversationId)

            const timestamp = new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            })

            if (existingChat) {
                // Añadir mensaje a chat existente
                addMessage(randomMsg.conversationId, {
                    text: randomMsg.text,
                    own: false,
                    platform: randomMsg.platform,
                    timestamp,
                })

                // Notificar si no es el chat activo
                if (activeChatId !== randomMsg.conversationId) {
                    addNotification()
                }
            } else {
                // Crear nuevo chat
                const newConv: Omit<Conversation, 'unread'> = {
                    id: randomMsg.conversationId,
                    name: randomMsg.name || 'Contacto nuevo',
                    platform: randomMsg.platform,
                    lastMessage: randomMsg.text,
                    time: 'Ahora',
                    assignedTo: 'agent-1', // 👈 ¡Agrega esta línea!
                    messages: [
                        {
                            id: `m${Date.now()}`,
                            text: randomMsg.text,
                            own: false,
                            platform: randomMsg.platform,
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        },
                    ],
                }

                addNewConversation(newConv)

                if (activeChatId !== randomMsg.conversationId) {
                    addNotification()
                }
            }
        }, 8000)

        return () => clearInterval(interval)
    }, [
        conversations,
        activeChatId,
        addMessage,
        addNewConversation,
        addNotification,
    ])
}