import { api } from "@/core/services/api"
import { REQUIREMENT } from "../routes"
import { Requirement } from "../../models"

type createRequirementWithAiProps = {
  requirement: Requirement
}

export async function createRequirementWithAi({requirement} : createRequirementWithAiProps) {
  const response = await api.post<Requirement>(
    `${REQUIREMENT}/ai-description`,
    requirement
  )

  return response.data
}
