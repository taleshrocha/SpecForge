import { useQuery } from '@tanstack/react-query'
import { Requirement } from '../../models'
import { getAllRequirements } from '../requests/get-all-requirements.request'

/**
 * Hook to fetch all requirements from the API
 * @returns Query result containing array of requirements
 */
export function useGetAllRequirements() {
    return useQuery<Requirement[]>({
        queryKey: ['REQUIREMENTS'],
        queryFn: getAllRequirements
    })
}
