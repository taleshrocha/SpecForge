import { useMutation } from '@tanstack/react-query'
import { createWiegersMatrix } from '../requests'

export function useCreateWiegersMatrix() {
  return useMutation({
    mutationFn: (requirementIds: string[]) => createWiegersMatrix({ requirementIds })
  })
}
