// src/store/chatStore.ts
import { create } from 'zustand'

export type Platform = 'whatsapp' | 'facebook' | 'instagram' | 'tiktok' | 'all'

export interface Message {
  id: string
  text: string
  own: boolean
  platform: Platform
  timestamp: string
}

export interface Conversation {
  id: string
  name: string
  platform: Platform
  lastMessage: string
  time: string
  unread: boolean
  messages: Message[]
}
export interface Template {
  id: string
  name: string
  content: string
  platform: Platform // 'all', 'whatsapp', etc.
}

interface ChatStore {
  conversations: Conversation[]
  activeChatId: string | null
  filter: Platform                    // 👈 añadido
  setActiveChat: (id: string) => void
  addMessage: (conversationId: string, message: Omit<Message, 'id'>) => void
  setFilter: (platform: Platform) => void  // 👈 añadido
  searchQuery: string
  setSearchQuery: (query: string) => void
  notifications: number
  addNotification: () => void
  clearNotifications: () => void
  addNewConversation: (conv: Omit<Conversation, 'unread'>) => void
  templates: Template[]
addTemplate: (template: Omit<Template, 'id'>) => void
updateTemplate: (id: string, updates: Partial<Template>) => void
deleteTemplate: (id: string) => void
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    platform: 'whatsapp',
    lastMessage: '¿Ya recibiste el archivo?',
    time: '10:30',
    unread: true,
    messages: [
      { id: 'm1', text: 'Hola, necesito ayuda con mi pedido', own: false, platform: 'whatsapp', timestamp: '10:25' },
      { id: 'm2', text: 'Claro, ¿cuál es tu número de orden?', own: true, platform: 'whatsapp', timestamp: '10:26' },
      { id: 'm3', text: 'Es el #12345', own: false, platform: 'whatsapp', timestamp: '10:28' },
    ]
  },
  {
    id: '2',
    name: 'Ana López',
    platform: 'instagram',
    lastMessage: 'Gracias por la ayuda 👍',
    time: '09:15',
    unread: false,
    messages: [
      { id: 'm4', text: '¡Hola! ¿Tienen stock del producto X?', own: false, platform: 'instagram', timestamp: '09:10' },
      { id: 'm5', text: 'Sí, tenemos disponible 😊', own: true, platform: 'instagram', timestamp: '09:12' },
      { id: 'm6', text: 'Gracias por la ayuda 👍', own: false, platform: 'instagram', timestamp: '09:15' },
    ]
  },
]

export const useChatStore = create<ChatStore>((set) => ({
  templates: [
  {
    id: 't1',
    name: 'Gracias por contactarnos',
    content: '¡Hola! Gracias por escribirnos. En breve te atenderemos.',
    platform: 'all',
  },
  {
    id: 't2',
    name: 'Horario de atención',
    content: 'Nuestro horario de atención es de lunes a viernes, 9:00 a.m. a 6:00 p.m.',
    platform: 'all',
  },
  {
    id: 't3',
    name: 'Soporte técnico WhatsApp',
    content: 'Para soporte técnico, por favor envía tu número de orden y una descripción del problema.',
    platform: 'whatsapp',
  },
],
addTemplate: (newTemplate) =>
  set((state) => ({
    templates: [
      ...state.templates,
      { ...newTemplate, id: `t${Date.now()}` },
    ],
  })),
updateTemplate: (id, updates) =>
  set((state) => ({
    templates: state.templates.map(t => t.id === id ? { ...t, ...updates } : t),
  })),
deleteTemplate: (id) =>
  set((state) => ({
    templates: state.templates.filter(t => t.id !== id),
  })),
 addNewConversation: (newConv) =>
  set((state) => ({
    ...state, // 👈 preserva todo el estado existente
    conversations: [
      { ...newConv, unread: true },
      ...state.conversations,
    ],
  })),
  notifications: 0,
  addNotification: () => set((state) => ({ notifications: state.notifications + 1 })),
  clearNotifications: () => set({ notifications: 0 }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  conversations: mockConversations,
  activeChatId: '1',
  filter: 'all', // 👈 estado inicial del filtro

  setActiveChat: (id) =>
    set((state) => ({
      activeChatId: id,
      conversations: state.conversations.map(conv =>
        conv.id === id ? { ...conv, unread: false } : conv
      )
    })),

  addMessage: (conversationId, newMessage) =>
    set((state) => {
      const msgWithId = { ...newMessage, id: `m${Date.now()}` }
      return {
        conversations: state.conversations.map(conv =>
          conv.id === conversationId
            ? {
              ...conv,
              lastMessage: newMessage.text,
              time: 'Ahora',
              messages: [...conv.messages, msgWithId],
            }
            : conv
        ),
      }
    }),

  setFilter: (platform) => set({ filter: platform }), // 👈 nueva función
}))