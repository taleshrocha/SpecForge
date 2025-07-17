import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createGlossary } from '../requests/create-glossary.request'

export function useCreateGlossary() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: () => createGlossary(),
    onSuccess: () => {
      // Invalidate and refetch glossary data
      queryClient.invalidateQueries({ queryKey: ['GLOSSARY'] })
    }
  })
}