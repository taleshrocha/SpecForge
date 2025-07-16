import { api } from "@/core/services/api"
import { REQUIREMENT } from "../routes"
import { WiegersMatrix } from "@/requirements/models"

type createWiegersMatrixProps = {
  requirementIds: string[]
}

export async function createWiegersMatrix({ requirementIds }: createWiegersMatrixProps) {
  const response = await api.post<WiegersMatrix[]>(
    `${REQUIREMENT}/wiegers/analyze`,
    requirementIds
  )

  return response.data
}
