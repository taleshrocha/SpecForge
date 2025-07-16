import { useQuery } from '@tanstack/react-query'
import { Requirement } from '../../models'
import { getRequirement } from '../requests'

type useGetRequirementProps = {
  requirementId: string,
}

/**
 * Hook to fetch a single requirement by ID
 * @param requirementId - The ID of the requirement to fetch
 * @returns Query result containing the requirement data
 */
export function useGetRequirement({ requirementId: requirementId }: useGetRequirementProps
) {
  return useQuery<Requirement>({
    queryKey: ['REQUIREMENT', requirementId],
    queryFn: () => getRequirement({ requirementId })
  })
}
