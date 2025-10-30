// src/components/SimulatedMessagesProvider.tsx
import { useSimulatedMessages } from '../hooks/useSimulatedMessages'

export default function SimulatedMessagesProvider({ children }: { children: React.ReactNode }) {
  useSimulatedMessages()
  return <>{children}</>
}