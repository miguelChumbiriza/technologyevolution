// src/pages/SettingsPage.tsx
import { useChatStore } from '../store/chatStore'
import { useTheme } from '../hooks/useTheme'

export default function SettingsPage() {
  const { userRole, setUserRole } = useChatStore()
  const { theme, toggleTheme } = useTheme()
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    window.location.href = '/login'
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Configuración</h1>
        <p className="text-gray-600">Administra tu perfil y preferencias</p>
      </div>

      {/* Perfil */}
      <section className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Perfil</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <input
              type="text"
              defaultValue="Agente Principal"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Disponible</option>
              <option>Ocupado</option>
              <option>Ausente</option>
            </select>
          </div>
        </div>
      </section>

      {/* Rol de usuario */}
      <section className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Rol de usuario</h2>
        <p className="text-sm text-gray-600 mb-4">
          Cambia tu rol para ver diferentes vistas (útil para pruebas).
        </p>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              checked={userRole === 'agent'}
              onChange={() => setUserRole('agent')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">Agente</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              checked={userRole === 'supervisor'}
              onChange={() => setUserRole('supervisor')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">Supervisor</span>
          </label>
        </div>
      </section>

      {/* Notificaciones */}
      <section className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Notificaciones</h2>
        <div className="space-y-3">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500" />
            <span className="ml-3 text-gray-700">Notificaciones de escritorio</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500" />
            <span className="ml-3 text-gray-700">Reproducir sonido al recibir mensaje</span>
          </label>
        </div>
      </section>

      {/* Cuenta */}
      <section className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Cuenta</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-red-600 hover:text-red-800 font-medium rounded-md hover:bg-red-50 transition"
        >
          Cerrar sesión
        </button>
      </section>

      {/* Apariencia */}
      <section className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Apariencia</h2>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                className="sr-only"
              />
              <div className={`block w-14 h-8 rounded-full ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${theme === 'dark' ? 'transform translate-x-6' : ''}`}></div>
            </div>
            <span className="ml-3 text-gray-700 dark:text-gray-300">
              {theme === 'dark' ? 'Modo oscuro' : 'Modo claro'}
            </span>
          </label>
        </div>
      </section>

    </div>
  )
}