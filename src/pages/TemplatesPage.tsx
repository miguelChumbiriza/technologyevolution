// src/pages/TemplatesPage.tsx
import { useState } from 'react'
import { useChatStore, type Platform } from '../store/chatStore'

export default function TemplatesPage() {
    const { templates, addTemplate, updateTemplate, deleteTemplate } = useChatStore()

    const [isCreating, setIsCreating] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    // Estado tipado correctamente con Platform
    const [form, setForm] = useState<{ name: string; content: string; platform: Platform }>({
        name: '',
        content: '',
        platform: 'all',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (form.name.trim() && form.content.trim()) {
            if (editingId) {
                // Modo edición
                updateTemplate(editingId, form)
                setEditingId(null)
            } else {
                // Modo creación
                addTemplate(form)
            }
            // Reset
            setForm({ name: '', content: '', platform: 'all' })
            setIsCreating(false)
        }
    }

    const handleEdit = (tpl: { id: string; name: string; content: string; platform: Platform }) => {
        setForm({
            name: tpl.name,
            content: tpl.content,
            platform: tpl.platform,
        })
        setEditingId(tpl.id)
        setIsCreating(true)
    }

    const handleCancel = () => {
        setIsCreating(false)
        setEditingId(null)
        setForm({ name: '', content: '', platform: 'all' })
    }

    return (

        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Plantillas de respuesta</h1>
                <button
                    onClick={() => {
                        setIsCreating(true)
                        setEditingId(null) // opcional, para limpiar modo edición
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    + Nueva plantilla
                </button>
            </div>

            {/* Formulario de creación/edición */}
            {isCreating && (
                <div className="bg-white p-4 rounded-lg shadow mb-6 border">
                    <h2 className="font-medium mb-3">
                        {editingId ? 'Editar plantilla' : 'Crear nueva plantilla'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                            type="text"
                            placeholder="Nombre de la plantilla"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                        <textarea
                            placeholder="Contenido del mensaje"
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            className="w-full border rounded px-3 py-2 h-24"
                            required
                        />
                        <select
                            value={form.platform}
                            onChange={(e) => setForm({ ...form, platform: e.target.value as Platform })}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="all">Todas las redes</option>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="facebook">Facebook</option>
                            <option value="instagram">Instagram</option>
                            <option value="tiktok">TikTok</option>
                        </select>
                        <div className="flex gap-2">
                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                                {editingId ? 'Actualizar' : 'Guardar'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Lista de plantillas */}
            <div className="space-y-4">
                {templates.map((tpl) => (
                    <div key={tpl.id} className="bg-white p-4 rounded-lg border">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-semibold">{tpl.name}</h3>
                                <span
                                    className={`text-xs px-2 py-1 rounded mt-1 inline-block ${tpl.platform === 'all'
                                            ? 'bg-gray-200 text-gray-700'
                                            : tpl.platform === 'whatsapp'
                                                ? 'bg-whatsapp text-white'
                                                : tpl.platform === 'facebook'
                                                    ? 'bg-facebook text-white'
                                                    : tpl.platform === 'instagram'
                                                        ? 'bg-instagram text-white'
                                                        : 'bg-black text-white'
                                        }`}
                                >
                                    {tpl.platform === 'all'
                                        ? 'Todas'
                                        : tpl.platform.charAt(0).toUpperCase() + tpl.platform.slice(1)}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(tpl)}
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => deleteTemplate(tpl.id)}
                                    className="text-red-600 hover:underline text-sm"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                        <p className="mt-2 text-gray-700 whitespace-pre-wrap">{tpl.content}</p>
                    </div>
                ))}
            </div>

            {templates.length === 0 && !isCreating && (
                <p className="text-gray-500 text-center mt-8">No hay plantillas. Crea una nueva.</p>
            )}
        </div>
    )
}

