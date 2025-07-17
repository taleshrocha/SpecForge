import { useMutation } from '@tanstack/react-query'
import { createGlossary } from '../requests/create-glossary.request'

export function useCreateGlossary() {
  return useMutation({
    mutationFn: () => createGlossary()
  })
}