'use client'

import { useState } from 'react'
import { useCreateRequirementWithAi } from '../../../requirements/tanstack/mutations/use-create-requirement-with-ai'
import { RequirementType, RequirementStatus, PriorityLevel, RiskLevel, ComplexityLevel } from '../../../requirements/enums/index.enum'
import { Requirement } from '../../../requirements/models'
import { Input, Select, Button } from '../../../core/components/form'

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

  const typeOptions = [
    { value: RequirementType.FUNCTIONAL, label: 'Funcional' },
    { value: RequirementType.NON_FUNCTIONAL, label: 'Não Funcional' }
  ]

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Criar Novo Requisito</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="title"
          name="title"
          label="Nome do Requisito"
          value={formData.title}
          onChange={handleInputChange}
          required
        />

        <Select
          id="type"
          name="type"
          label="Tipo"
          value={formData.type}
          onChange={handleInputChange}
          options={typeOptions}
          required
        />

        <Input
          id="stakeholders"
          name="stakeholders"
          label="Stakeholders"
          value={formData.stakeholders}
          onChange={handleInputChange}
          placeholder="Separe múltiplos stakeholders por vírgula"
          helperText="Exemplo: Product Owner, Developer, QA Tester"
        />

        <Input
          id="version"
          name="version"
          label="Versão"
          value={formData.version}
          onChange={handleInputChange}
        />

        <Button
          type="submit"
          loading={isPendingCrateRequirement}
          className="w-full"
        >
          {isPendingCrateRequirement ? 'Criando...' : 'Criar Requisito'}
        </Button>
      </form>

      {isErrorCreateRequirement && (
        <div className="mt-4 p-4 bg-error-light border-2 border-error text-error rounded-lg">
          Erro ao criar requisito. Tente novamente.
        </div>
      )}
    </div>
  )
}
