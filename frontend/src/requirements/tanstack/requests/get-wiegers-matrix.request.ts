import { WiegersMatrix } from '../../models/wiegers-matrix.model'

export async function getWiegersMatrix(): Promise<WiegersMatrix[]> {
  const response = await fetch('/api/wiegers-matrix')
  
  if (!response.ok) {
    throw new Error('Failed to fetch Wiegers matrix')
  }
  
  return response.json()
}
