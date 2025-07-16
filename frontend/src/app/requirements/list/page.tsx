'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGetAllRequirements } from '../../../requirements/tanstack/queries/use-get-all-requirements.query'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, Badge } from '../../../core/components'
import { RequirementType, RequirementStatus } from '../../../requirements/enums/index.enum'

/**
 * Requirements list page component displaying all requirements in a table format
 * @returns JSX element representing the requirements list page
 */
export default function RequirementsList() {
  const router = useRouter()
  const [stakeholderFilter, setStakeholderFilter] = useState('')
  const [activeStakeholderFilter, setActiveStakeholderFilter] = useState<string | undefined>(undefined)
  const { data: requirements, isLoading, isError } = useGetAllRequirements(activeStakeholderFilter)

  /**
   * Handles navigation to requirement details page
   * @param requirementId - ID of the requirement to view
   */
  const handleRowClick = (requirementId: number) => {
    router.push(`/requirements/${requirementId}`)
  }

  /**
   * Handles applying the stakeholder filter
   */
  const handleApplyFilter = () => {
    setActiveStakeholderFilter(stakeholderFilter || undefined)
  }

  /**
   * Handles clearing the stakeholder filter
   */
  const handleClearFilter = () => {
    setStakeholderFilter('')
    setActiveStakeholderFilter(undefined)
  }

  /**
   * Gets the appropriate badge variant for requirement status
   * @param status - Requirement status
   * @returns Badge variant string
   */
  const getStatusVariant = (status?: RequirementStatus) => {
    if (!status) return 'outline'
    switch (status) {
      case RequirementStatus.APPROVED:
        return 'default'
      case RequirementStatus.DRAFT:
        return 'secondary'
      case RequirementStatus.REJECTED:
        return 'destructive'
      default:
        return 'outline'
    }
  }

  /**
   * Gets the appropriate badge variant for requirement type
   * @param type - Requirement type
   * @returns Badge variant string
   */
  const getTypeVariant = (type: RequirementType) => {
    return type === RequirementType.FUNCTIONAL ? 'default' : 'secondary'
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Requisitos</h1>
        <button
          onClick={() => router.push('/requirements/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Criar Requisito
        </button>
      </div>

      {/* Stakeholder Filter */}
      <div className="mb-6">
        <label htmlFor="stakeholderFilter" className="block text-sm font-medium text-gray-700 mb-2">
          Filtrar por Stakeholder
        </label>
        <div className="flex gap-2 max-w-md">
          <input
            type="text"
            id="stakeholderFilter"
            value={stakeholderFilter}
            onChange={(e) => setStakeholderFilter(e.target.value)}
            placeholder="Digite o nome do stakeholder para filtrar"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleApplyFilter}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Filtrar
          </button>
          {activeStakeholderFilter && (
            <button
              onClick={handleClearFilter}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Limpar
            </button>
          )}
        </div>
        {activeStakeholderFilter && (
          <p className="text-sm text-blue-600 mt-2">
            Filtrando por: "{activeStakeholderFilter}"
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="text-center">Carregando requisitos...</div>
      ) : isError ? (
        <div className="text-center text-red-600">Erro ao carregar requisitos.</div>
      ) : requirements && requirements.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Versão</TableHead>
              <TableHead>Stakeholders</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requirements.map((requirement) => (
              <TableRow
                key={requirement._id}
                onClick={() => requirement._id && handleRowClick(requirement._id)}
              >
                <TableCell className="font-medium">{requirement._id || 'N/A'}</TableCell>
                <TableCell>{requirement.title}</TableCell>
                <TableCell>
                  <Badge variant={getTypeVariant(requirement.type)}>
                    {requirement.type === RequirementType.FUNCTIONAL ? 'Funcional' : 'Não Funcional'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(requirement.status)}>
                    {requirement.status || 'Não definido'}
                  </Badge>
                </TableCell>
                <TableCell>{requirement.attributes?.priority || 'N/A'}</TableCell>
                <TableCell>{requirement.version}</TableCell>
                <TableCell>
                  {requirement.stakeholders && requirement.stakeholders.length > 0 ? requirement.stakeholders.join(', ') : 'Nenhum'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">
            {activeStakeholderFilter ? 
              `Nenhum requisito encontrado para o stakeholder "${activeStakeholderFilter}".` : 
              'Nenhum requisito encontrado.'
            }
          </p>
          <button
            onClick={() => router.push('/requirements/create')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Criar Primeiro Requisito
          </button>
        </div>
      )}
    </div>
  )
}
