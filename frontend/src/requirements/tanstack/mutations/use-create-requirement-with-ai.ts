import { useMutation } from '@tanstack/react-query'
import { Requirement } from '../../models'
import { createRequirementWithAi } from '../requests'

export function useCreateRequirementWithAi() {
  return useMutation({
    mutationFn: (requirement: Requirement) => createRequirementWithAi({requirement})
  })
}