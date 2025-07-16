import { api } from "../../../core/services/api"
import { REQUIREMENT } from "../routes"
type getRequirementRequestProps = {
    requirementId: number
}

export const getRequirement = async ({ requirementId }: getRequirementRequestProps) =>
    (await api.get(`${REQUIREMENT}/${requirementId}`)).data.data

