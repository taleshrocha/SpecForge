'use client'

import { useRouter } from 'next/navigation'
import { useGetGlossary } from '../../../requirements/tanstack/queries/use-get-glossary.query'
import { useCreateGlossary } from '../../../requirements/tanstack/mutations/use-create-glossary'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../../core/components'
import { Glossary } from '../../../requirements/models/glossary.model'

/**
 * Glossary terms list page component displaying all terms in a table format
 * @returns JSX element representing the glossary terms list page
 */
export default function GlossariesList() {
  const router = useRouter()
  const { data: glossary, isLoading, isError, error } = useGetGlossary()
  const createGlossaryMutation = useCreateGlossary()

  /**
   * Handles navigation to term details page
   * @param termName - Name of the term to view
   */
  const handleRowClick = (termName: string) => {
    router.push(`/glossaries/terms/${encodeURIComponent(termName)}`)
  }

  /**
   * Handles creating a new glossary
   */
  const handleCreateGlossary = async () => {
    try {
      await createGlossaryMutation.mutateAsync()
    } catch (error) {
      console.error('Error creating glossary:', error)
    }
  }

  /**
   * Formats date string for display
   * @param dateString - ISO date string
   * @returns Formatted date string
   */
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  // Check if error is 404 (no glossary found)
  const is404Error = (error as any)?.status === 404

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Glossário de Termos</h1>
        <button
          onClick={handleCreateGlossary}
          disabled={createGlossaryMutation.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createGlossaryMutation.isPending ? 'Criando...' : 'Criar Glossário'}
        </button>
      </div>

      {glossary && (
        <div className="mb-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            Total de termos: {glossary.terms?.length || 0} | 
            Criado em: {formatDate(glossary.created_at)} | 
            Atualizado em: {formatDate(glossary.updated_at)}
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="text-center">Carregando glossário...</div>
      ) : isError && !is404Error ? (
        <div className="text-center text-red-600">Erro ao carregar glossário.</div>
      ) : glossary && glossary.terms && glossary.terms.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Termo</TableHead>
              <TableHead>Definição</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {glossary.terms.map((term, index) => (
              <TableRow
                key={`${term.name}-${index}`}
                onClick={() => handleRowClick(term.name)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <TableCell className="font-medium">{term.name}</TableCell>
                <TableCell>{term.definition}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Nenhum termo encontrado no glossário.</p>
          <button
            onClick={handleCreateGlossary}
            disabled={createGlossaryMutation.isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createGlossaryMutation.isPending ? 'Criando...' : 'Criar Primeiro Glossário'}
          </button>
        </div>
      )}

      {createGlossaryMutation.isError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">Erro ao criar glossário. Tente novamente.</p>
        </div>
      )}
    </div>
  )
}
