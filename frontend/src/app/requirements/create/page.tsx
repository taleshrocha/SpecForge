'use client'

import { useState } from 'react'
import { useCreateRequirementWithAi } from '../tanstack/mutations/use-create-requirement-with-ai'
import { RequirementType, RequirementStatus, PriorityLevel, RiskLevel, ComplexityLevel } from '../enums/index.enum'
import { Requirement } from '../models'

export default function CreateRequirement() {
  const [formData, setFormData] = useState({
    title: '',
    type: RequirementType.FUNCTIONAL,
    stakeholders: '',
    context: '',
    version: '1.0.0'
  })

  const {mutate: onCreateRequirement, isPending: isPendingCrateRequirement, isError: isErrorCreateRequirement} = useCreateRequirementWithAi()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const requirement: Requirement = {
      title: formData.title,
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
        version: '1.0.0'
      })
      },
      onError: () => {
        console.error("Erro ao criar requisito.")
      }
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Criar Novo Requisito</h1>
      
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
