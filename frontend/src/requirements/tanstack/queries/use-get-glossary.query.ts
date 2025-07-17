import { useQuery } from '@tanstack/react-query'
import { Glossary } from '../../models'
import { getGlossary } from '../requests/get-glossary.request'

export function useGetGlossary() {
  return useQuery<Glossary>({
    queryKey: ['GLOSSARY'],
    queryFn: () => getGlossary(),
    retry: (failureCount, error: any) => {
      // Don't retry on 404 errors
      if (error?.status === 404) {
        return false
      }
      return failureCount < 3
    }
  })
}
