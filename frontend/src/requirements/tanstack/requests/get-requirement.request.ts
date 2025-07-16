import { api } from "../../../core/services/api"
import { REQUIREMENT } from "../routes"
type getRequirementRequestProps = {
    requirementId: string
}

export const getRequirement = async ({ requirementId }: getRequirementRequestProps) => {
    const response = await api.get(`${REQUIREMENT}/${requirementId}`)
    return response.data
}

