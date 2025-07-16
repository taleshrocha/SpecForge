'use client'

import { useRouter } from 'next/navigation'
import { useGetRequirement } from '../../../requirements/tanstack/queries/use-get-requirement.query'
import { Card, CardHeader, CardTitle, CardContent, Badge } from '../../../core/components'
import { RequirementType, RequirementStatus } from '../../../requirements/enums/index.enum'

interface RequirementDetailsProps {
  params: { id: string }
}

/**
 * Requirement details page component displaying comprehensive requirement information
 * @param params - Route parameters containing requirement ID
 * @returns JSX element representing the requirement details page
 */
export default function RequirementDetails({ params }: RequirementDetailsProps) {
  const router = useRouter()
  const requirementId = params.id
  const { data: requirement, isLoading, isError } = useGetRequirement({ requirementId })

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

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center">Carregando requisito...</div>
      </div>
    )
  }

  console.log("requirement", requirement)

  if (isError || !requirement) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center text-red-600">Erro ao carregar requisito ou requisito não encontrado.</div>
        <div className="text-center mt-4">
          <button
            onClick={() => router.push('/requirements/list')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Voltar à Lista
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Detalhes do Requisito</h1>
        <button
          onClick={() => router.push('/requirements/list')}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Voltar à Lista
        </button>
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                <p className="text-lg">{requirement._id || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Versão</label>
                <p className="text-lg">{requirement.version}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <p className="text-lg font-semibold">{requirement.title}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <Badge variant={getTypeVariant(requirement.type)}>
                  {requirement.type === RequirementType.FUNCTIONAL ? 'Funcional' : 'Não Funcional'}
                </Badge>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Badge variant={getStatusVariant(requirement.status)}>
                  {requirement.status || 'Não definido'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        {requirement.description && (
          <Card>
            <CardHeader>
              <CardTitle>Descrição</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{requirement.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Attributes */}
        <Card>
          <CardHeader>
            <CardTitle>Atributos</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
              <p className="text-lg">{requirement.attributes.priority}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Risco</label>
              <p className="text-lg">{requirement.attributes.risk}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Complexidade</label>
              <p className="text-lg">{requirement.attributes.complexity}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimativa de Esforço</label>
              <p className="text-lg">{requirement.attributes.effort_estimation}h</p>
            </div>
          </CardContent>
        </Card>

        {/* Stakeholders */}
        <Card>
          <CardHeader>
            <CardTitle>Stakeholders</CardTitle>
          </CardHeader>
          <CardContent>
            {requirement.stakeholders && requirement.stakeholders.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {requirement.stakeholders.map((stakeholder, index) => (
                  <Badge key={index} variant="outline">
                    {stakeholder}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Nenhum stakeholder definido</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
