'use client'

import { useState } from 'react'
import { useGetAllRequirements } from '../../../requirements/tanstack/queries/use-get-all-requirements.query'
import { useCreateWiegersMatrix } from '../../../requirements/tanstack/mutations/use-create-wiegers-matrix'
import { WiegersMatrix } from '../../../requirements/models/wiegers-matrix.model'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../core/components/ui/table'
import { Button } from '../../../core/components/form'

type SortField = keyof WiegersMatrix
type SortDirection = 'asc' | 'desc'

export default function WiegersPage() {
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([])
  const [wiegersMatrix, setWiegersMatrix] = useState<WiegersMatrix[]>([])
  const [sortField, setSortField] = useState<SortField>('priority')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const { data: requirements, isLoading: isLoadingRequirements } = useGetAllRequirements()
  const { mutate: createMatrix, isPending: isCreatingMatrix } = useCreateWiegersMatrix()

  const handleRequirementToggle = (requirementId: string) => {
    setSelectedRequirements(prev => 
      prev.includes(requirementId)
        ? prev.filter(id => id !== requirementId)
        : [...prev, requirementId]
    )
  }

  const handleSelectAll = () => {
    if (selectedRequirements.length === requirements?.length) {
      setSelectedRequirements([])
    } else {
      setSelectedRequirements(requirements?.map(req => req._id?.toString() || '') || [])
    }
  }

  const isAllSelected = requirements && selectedRequirements.length === requirements.length
  const isIndeterminate = selectedRequirements.length > 0 && selectedRequirements.length < (requirements?.length || 0)

  const handleCreateMatrix = () => {
    if (selectedRequirements.length > 0) {
      createMatrix(selectedRequirements, {
        onSuccess: (data) => {
          setWiegersMatrix(data)
        }
      })
    }
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedMatrix = wiegersMatrix ? [...wiegersMatrix].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return 0
  }) : []

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕️'
    return sortDirection === 'asc' ? '↑' : '↓'
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Matriz de Wiegers</h1>
      
      {/* Requirements Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Selecionar Requisitos</h2>
        {isLoadingRequirements ? (
          <p>Carregando requisitos...</p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto border p-4 rounded">
            <label className="flex items-center space-x-2 border-b pb-2 mb-2">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(el) => {
                  if (el) el.indeterminate = !!isIndeterminate
                }}
                onChange={handleSelectAll}
                className="rounded"
              />
              <span className="font-medium">Selecionar Todos</span>
            </label>
            {requirements?.map((requirement) => (
              <label key={requirement._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedRequirements.includes(requirement._id?.toString() || '')}
                  onChange={() => handleRequirementToggle(requirement._id?.toString() || '')}
                  className="rounded"
                />
                <span>{requirement.title}</span>
              </label>
            ))}
          </div>
        )}
        
        <Button
          onClick={handleCreateMatrix}
          disabled={selectedRequirements.length === 0 || isCreatingMatrix}
          loading={isCreatingMatrix}
          className="mt-4"
        >
          Criar Tabela Wiegers
        </Button>
      </div>

      {/* Wiegers Matrix Table */}
      {wiegersMatrix && wiegersMatrix.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Matriz de Wiegers</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('requirement_title')}
                >
                  Requisito {getSortIcon('requirement_title')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('value')}
                >
                  Valor {getSortIcon('value')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('cost')}
                >
                  Custo {getSortIcon('cost')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('risk')}
                >
                  Risco {getSortIcon('risk')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('urgency')}
                >
                  Urgência {getSortIcon('urgency')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('priority')}
                >
                  Prioridade {getSortIcon('priority')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMatrix.map((item, index) => (
                <TableRow key={item.id || index}>
                  <TableCell>{item.requirement_title}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.cost}</TableCell>
                  <TableCell>{item.risk}</TableCell>
                  <TableCell>{item.urgency}</TableCell>
                  <TableCell className="font-semibold">{item.priority}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
