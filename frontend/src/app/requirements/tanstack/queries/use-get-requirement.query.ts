import { useQuery } from '@tanstack/react-query'
import { Requirement } from '../../models'
import { getRequirement } from '../requests'

type useGetRequirementProps = {
  requirementId: number,
}

export function useGetRequirement({ requirementId: requirementId }: useGetRequirementProps
) {
  return useQuery<Requirement>({
    queryKey: ['PAGE', requirementId],
    queryFn: () => getRequirement({ requirementId })
  })
}
