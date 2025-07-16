import { api } from "../../../core/services/api"
import { Requirement } from "../../models"
import { REQUIREMENT } from "../routes"

export const getAllRequirements = async () : Promise<Requirement[]> => {
    const response = await api.get(REQUIREMENT)
    const data = response.data

    return data ?? []
}
