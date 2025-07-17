import { useQuery } from '@tanstack/react-query'
import { Glossary } from '../../models'
import { getGlossary } from '../requests/get-glossary.request'

export function useGetGlossary() {
  return useQuery<Glossary>({
    queryKey: ['GLOSSARY'],
    queryFn: () => getGlossary()
  })
}
