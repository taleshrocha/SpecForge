import { useQuery } from '@tanstack/react-query'
import { Requirement } from '../../models'
import { getAllRequirements } from '../requests/get-all-requirements.request'

/**
 * Hook to fetch all requirements from the API
 * @param stakeholder Optional stakeholder filter
 * @returns Query result containing array of requirements
 */
export function useGetAllRequirements(stakeholder?: string) {
    return useQuery<Requirement[]>({
        queryKey: ['REQUIREMENTS', stakeholder],
        queryFn: () => getAllRequirements(stakeholder)
    })
}
