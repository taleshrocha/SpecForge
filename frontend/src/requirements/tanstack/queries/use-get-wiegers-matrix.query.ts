import { useQuery } from '@tanstack/react-query'
import { WiegersMatrix } from '../../models/wiegers-matrix.model'
import { getWiegersMatrix } from '../requests/get-wiegers-matrix.request'

/**
 * Hook to fetch Wiegers matrix data from the API
 * @returns Query result containing array of Wiegers matrix entries
 */
export function useGetWiegersMatrix() {
    return useQuery<WiegersMatrix[]>({
        queryKey: ['WIEGERS_MATRIX'],
        queryFn: getWiegersMatrix
    })
}
