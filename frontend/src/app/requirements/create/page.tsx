'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateRequirementWithAi } from '../../../requirements/tanstack/mutations/use-create-requirement-with-ai'
import { RequirementType, RequirementStatus, PriorityLevel, RiskLevel, ComplexityLevel } from '../../../requirements/enums/index.enum'
import { Requirement } from '../../../requirements/models'

/**
 * Create requirement page component for adding new requirements
 * @returns JSX element representing the create requirement page
 */
export default function CreateRequirement() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    type: RequirementType.FUNCTIONAL,
    stakeholders: '',
    context: '',
    details: '',
    version: '1.0.0'
  })

  const {mutate: onCreateRequirement, isPending: isPendingCrateRequirement, isError: isErrorCreateRequirement} = useCreateRequirementWithAi()

  /**
   * Handles form input changes
   * @param e - Input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  /**
   * Handles form submission
   * @param e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const requirement: Requirement = {
      title: formData.title,
      details: formData.details || undefined,
      stakeholders: formData.stakeholders.split(',').map(s => s.trim()).filter(s => s),
      type: formData.type as RequirementType,
      attributes: {
        priority: PriorityLevel.HIGH,
        risk: RiskLevel.CRITICAL,
        complexity: ComplexityLevel.HIGH,
        effort_estimation: 80
      },
      version: formData.version,
      status: RequirementStatus.DRAFT
    }

    onCreateRequirement(requirement, {
      onSuccess: () => {
        setFormData({
          title: '',
          type: RequirementType.FUNCTIONAL,
          stakeholders: '',
          context: '',
          details: '',
          version: '1.0.0'
        })
        router.push('/requirements/list')
      },
      onError: () => {
        console.error("Erro ao criar requisito.")
      }
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Criar Novo Requisito</h1>
        <button
          onClick={() => router.push('/requirements/list')}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancelar
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Requisito *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo *
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={RequirementType.FUNCTIONAL}>Funcional</option>
            <option value={RequirementType.NON_FUNCTIONAL}>Não Funcional</option>
          </select>
        </div>

        <div>
          <label htmlFor="stakeholders" className="block text-sm font-medium text-gray-700 mb-2">
            Stakeholders
          </label>
          <input
            type="text"
            id="stakeholders"
            name="stakeholders"
            value={formData.stakeholders}
            onChange={handleInputChange}
            placeholder="Separe múltiplos stakeholders por vírgula"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">Exemplo: Product Owner, Developer, QA Tester</p>
        </div>

        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
            Detalhes
          </label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            rows={4}
            placeholder="Descreva os detalhes do requisito (opcional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-2">
            Versão
          </label>
          <input
            type="text"
            id="version"
            name="version"
            value={formData.version}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isPendingCrateRequirement }
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPendingCrateRequirement ? 'Criando...' : 'Criar Requisito'}
        </button>
      </form>

      {isErrorCreateRequirement && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Erro ao criar requisito. Tente novamente.
        </div>
      )}
    </div>
  )
}
