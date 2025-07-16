import { api } from "../../../core/services/api"
import { Requirement } from "../../models"
import { REQUIREMENT } from "../routes"

export const getAllRequirements = async (stakeholder?: string) : Promise<Requirement[]> => {
    const params = stakeholder ? { stakeholder } : undefined
    const response = await api.get(REQUIREMENT, { params })
    const data = response.data

    return data ?? []
}
