import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createWiegersMatrix } from '../requests'

export function useCreateWiegersMatrix() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (requirementIds: string[]) => createWiegersMatrix({ requirementIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['WIEGERS_MATRIX'] })
    }
  })
}
