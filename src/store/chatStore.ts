// src/store/chatStore.ts
import { create } from 'zustand'


export type Platform = 'whatsapp' | 'facebook' | 'instagram' | 'tiktok' | 'all'

export type UserRole = 'agent' | 'supervisor'

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
  assignedTo: 'agent-1' | 'agent-2' | 'unassigned' // 👈 nuevo campo
  messages: Message[]
}

export interface Template {
  id: string
  name: string
  content: string
  platform: Platform
}

interface ChatStore {
  userRole: UserRole
  setUserRole: (role: UserRole) => void
  conversations: Conversation[]
  activeChatId: string | null
  filter: Platform
  searchQuery: string
  notifications: number
  templates: Template[]



  // Acciones
  setActiveChat: (id: string | null) => void
  markAsRead: (id: string) => void
  addMessage: (conversationId: string, message: Omit<Message, 'id'>) => void
  setFilter: (platform: Platform) => void
  setSearchQuery: (query: string) => void
  addNotification: () => void
  clearNotifications: () => void
  addNewConversation: (conv: Omit<Conversation, 'unread'>) => void
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
    assignedTo: 'agent-1', // 👈 asignado a ti
    messages: [ /* ... */]
  },
  {
    id: '2',
    name: 'Ana López',
    platform: 'instagram',
    lastMessage: 'Gracias por la ayuda 👍',
    time: '09:15',
    unread: false,
    assignedTo: 'agent-2', // 👈 asignado a otro agente
    messages: [ /* ... */]
  },
  {
    id: '3',
    name: 'Luis Ramírez',
    platform: 'facebook',
    lastMessage: '¿Tienen soporte en vivo?',
    time: '08:45',
    unread: true,
    assignedTo: 'agent-1', // 👈 tuyo
    messages: [
      { id: 'm7', text: 'Hola, ¿tienen soporte en vivo?', own: false, platform: 'facebook', timestamp: '08:45' }
    ]
  },
]

export const useChatStore = create<ChatStore>((set) => ({
  // Estado inicial
  userRole: 'agent', // 👈 valor por defecto
  
  conversations: mockConversations,
  activeChatId: null,
  filter: 'all',
  searchQuery: '',
  notifications: 0,
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

  // Acciones
  setUserRole: (role) => set({ userRole: role }),
  setActiveChat: (id) => set({ activeChatId: id }),

  markAsRead: (id) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === id ? { ...conv, unread: false } : conv
      ),
    })),

  addMessage: (conversationId, newMessage) =>
    set((state) => {
      const msgWithId = { ...newMessage, id: `m${Date.now()}` }
      return {
        conversations: state.conversations.map((conv) =>
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

  setFilter: (platform) => set({ filter: platform }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  addNotification: () => set((state) => ({ notifications: state.notifications + 1 })),
  clearNotifications: () => set({ notifications: 0 }),

  addNewConversation: (newConv) =>
    set((state) => ({
      ...state,
      conversations: [{ ...newConv, unread: true }, ...state.conversations],
    })),

  addTemplate: (newTemplate) =>
    set((state) => ({
      templates: [...state.templates, { ...newTemplate, id: `t${Date.now()}` }],
    })),

  updateTemplate: (id, updates) =>
    set((state) => ({
      templates: state.templates.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  deleteTemplate: (id) =>
    set((state) => ({
      templates: state.templates.filter((t) => t.id !== id),
    })),
}))